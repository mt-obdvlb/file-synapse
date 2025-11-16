import { LogGetDTO } from '@mtobdvlb/shared-types'
import { logList } from '@/apis'
import { useQuery } from '@tanstack/react-query'

export const useLogList = (params: LogGetDTO) => {
  const { data } = useQuery({
    queryKey: ['log', 'list', params],
    queryFn: () => logList(params),
  })
  return {
    logList: data?.data?.list,
    total: data?.data?.total,
  }
}
