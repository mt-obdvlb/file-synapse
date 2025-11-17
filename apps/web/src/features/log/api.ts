import { LogGetDTO, LogGetItem, LogGetList } from '@mtobdvlb/shared-types'
import { logList } from '@/apis'
import { useInfiniteQuery } from '@tanstack/react-query'

interface GroupedLogs {
  within1h: LogGetList
  within1d: LogGetList
  yesterday: LogGetList
  out: LogGetList
}

export const useLogList = (params: Omit<LogGetDTO, 'page' | 'pageSize'>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => logList({ ...params, page: pageParam as number, pageSize: 10 }),

    queryKey: ['log', 'list', params],

    getNextPageParam: (lastPage, allPages) => {
      const listLen = lastPage.data?.list.length ?? 0
      if (listLen < 10) return undefined
      return allPages.length + 1
    },

    initialPageParam: 1,
  })

  // 将分页数据整合成单一 list
  const list: LogGetList =
    data?.pages.flatMap((p) => p.data?.list).filter((i): i is LogGetItem => Boolean(i)) ?? []

  const total: number = data?.pages.at(0)?.data?.total ?? 0

  // ------------ 分组逻辑 ------------
  const now = Date.now()

  const groupLogs = (): GroupedLogs => {
    const within1h: LogGetList = []
    const within1d: LogGetList = []
    const yesterday: LogGetList = []
    const out: LogGetList = []

    list.forEach((item) => {
      const diff = now - new Date(item.log.operationTime).getTime()

      if (diff <= 3600_000) {
        within1h.push(item)
      } else if (diff <= 24 * 3600_000) {
        within1d.push(item)
      } else if (diff <= 2 * 24 * 3600_000) {
        yesterday.push(item)
      } else {
        out.push(item)
      }
    })

    return { within1h, within1d, out, yesterday }
  }

  const grouped = groupLogs()

  const groupList = [
    { label: '一小时内', value: grouped.within1h },
    { label: '今天', value: grouped.within1d },
    { label: '昨天', value: grouped.yesterday },
    { label: '更早', value: grouped.out },
  ].filter((group) => group.value.length > 0) // 过滤掉空组

  return {
    total,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    groupList,
    refetch,
  }
}
