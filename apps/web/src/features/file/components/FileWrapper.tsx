'use client'

import { useFileList } from '@/features'
import { useState } from 'react'
import { FileType } from '@mtobdvlb/shared-types'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import FilePagination from '@/features/file/components/FilePagination'
import FileTable from '@/features/file/components/FileTable'

const FileWrapper = () => {
  const [page, setPage] = useState(1)
  const [kw, setKw] = useState('')
  const [type, setType] = useState<FileType | 'all'>('all')

  const { total, fileList } = useFileList({
    page,
    pageSize: 20,
    kw: kw || undefined,
    type: type === 'all' ? undefined : type,
  })

  if (fileList.length === 0)
    return (
      <>
        <div className={'size-full justify-center flex items-center'}>
          <span className={'font-bold text-xl'}>暂无数据</span>
        </div>
      </>
    )

  return (
    <div className={'mx-auto w-300 py-30'}>
      <div className={'flex justify-between items-center mb-4'}>
        <div className={'flex gap-2'}>
          {/* 文件类型筛选 */}
          <Select value={type} onValueChange={(val: FileType | 'all') => setType(val)}>
            <SelectTrigger className='w-32'>
              <SelectValue placeholder='选择类型' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>全部</SelectItem>
              <SelectItem value='image'>图片</SelectItem>
              <SelectItem value='video'>视频</SelectItem>
              <SelectItem value='audio'>音频</SelectItem>
              <SelectItem value='document'>文档</SelectItem>
              <SelectItem value='other'>其他</SelectItem>
            </SelectContent>
          </Select>

          {/* 关键词搜索 */}
          <Input
            placeholder='搜索文件名'
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setPage(1) // 搜索时回到第一页
            }}
            className='w-60'
          />
        </div>

        {/* 清空筛选 */}
        <Button
          onClick={() => {
            setKw('')
            setType('all')
            setPage(1)
          }}
        >
          清空筛选
        </Button>
      </div>
      <FileTable fileList={fileList} />
      <div className={'w-fit mx-auto flex justify-start items-center whitespace-nowrap'}>
        <div className={'mr-11 flex items-center justify-start'}>
          <FilePagination page={page} setPage={setPage} total={total} pageSize={20} />
        </div>
        <div className={'text-text1 flex items-center '}>
          <span className={'mr-2'}>{`共 ${Math.ceil(total / 20)} 页 / ${total} 个，跳至`}</span>
          <div
            className={'w-[50px] overflow-hidden inline-flex grow relative   text-4 rounded-md '}
          >
            <Input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = Number(e.currentTarget.value)
                  if (page < 1 || page > Math.ceil(total / 20)) {
                    e.currentTarget.value = ''
                    return
                  }
                  setPage(page)
                  e.currentTarget.blur()
                  e.currentTarget.value = ''
                }
              }}
              className={'h-8 leading-[1.5]  w-full '}
            />
          </div>
          <span className={'ml-2'}>页</span>
        </div>
      </div>
    </div>
  )
}

export default FileWrapper
