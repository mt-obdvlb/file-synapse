'use client'

import { useEffect, useRef, useState } from 'react'
import { useLogList } from '@/features'
import { OperationType } from '@mtobdvlb/shared-types'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { useInView } from 'motion/react'
import LogTimeLineItem from '@/features/log/components/LogTimeLineItem'
import { tv } from 'tailwind-variants'
import { cn } from '@/libs'
import { debounce } from 'lodash'

const operationTypeOptions: { label: string; value: OperationType }[] = [
  { label: '上传', value: 'UPLOAD' },
  { label: '下载', value: 'DOWNLOAD' },
  { label: '删除', value: 'DELETE' },
  { label: '登录', value: 'LOGIN' },
  { label: '更新用户', value: 'UPDATE_USER' },
]

const LogTimeLine = () => {
  const [operationType, setOperationType] = useState<OperationType | 'all'>('all')
  const [username, setUsername] = useState('')

  const emptyRef = useRef<HTMLDivElement>(null)
  const inView = useInView(emptyRef, { margin: `200px` })

  const { fetchNextPage, hasNextPage, groupList, refetch, isFetchingNextPage } = useLogList({
    operationType: operationType === 'all' ? undefined : operationType,
    username,
  })

  const [flippedId, setFlippedId] = useState<string | null>(null)

  // 防抖用户名搜索
  const handleUsernameChange = debounce((value: string) => {
    setUsername(value)
  }, 300)

  // 无限滚动触发
  useEffect(() => {
    if (inView && hasNextPage) void fetchNextPage()
  }, [inView, hasNextPage])

  // 筛选条件变化重新加载
  useEffect(() => {
    void refetch()
  }, [operationType, username])

  // Timeline 渐变线样式
  const historyStyles = tv({
    slots: {
      start: cn(
        'bottom-full absolute left-[15px] w-[2px] h-[94px] bg-[linear-gradient(0deg,#C9CCD0_0%,transparent_100%)]'
      ),
      end: cn(
        'top-full absolute left-[15px] w-[2px] h-[94px] bg-[linear-gradient(100deg,#C9CCD0_0%,transparent_100%)]'
      ),
    },
  })
  const { start, end } = historyStyles()

  return (
    <div className='p-8 w-300 mx-auto min-h-full '>
      <h2 className='text-2xl font-bold mb-6'>操作记录时间线</h2>

      {/* 筛选 */}
      <div className='flex items-center justify-end gap-4 mb-10 flex-wrap'>
        <Select
          value={operationType}
          onValueChange={(v) => setOperationType(v as OperationType | 'all')}
        >
          <SelectTrigger className='w-50'>
            <SelectValue placeholder='可选择操作类型' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='all'>全部</SelectItem>
              {operationTypeOptions.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          placeholder='可以输入用户名'
          defaultValue={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          className='w-50'
        />

        <Button
          className={'cursor-pointer'}
          variant='outline'
          size='sm'
          onClick={() => {
            setOperationType('all')
            setUsername('')
          }}
        >
          清空筛选
        </Button>
      </div>

      {/* Timeline */}
      <div>
        <div className='relative'>
          <div className={start()} />
        </div>

        {groupList.length === 0 ? (
          <div className='text-center text-gray-400 py-20 italic'>暂无记录</div>
        ) : (
          groupList.map((item, index) => (
            <LogTimeLineItem
              key={item.label}
              total={groupList.length}
              index={index}
              label={item.label}
              logList={item.value}
              flippedId={flippedId}
              setFlippedId={setFlippedId}
            />
          ))
        )}

        <div className='relative'>
          <div className={end()} />
        </div>
      </div>

      {/* 无限滚动触发点 */}
      <div ref={emptyRef} className='py-30 text-center text-sm text-gray-500'>
        {isFetchingNextPage ? '加载中...' : '已经到底了~'}
      </div>
    </div>
  )
}

export default LogTimeLine
