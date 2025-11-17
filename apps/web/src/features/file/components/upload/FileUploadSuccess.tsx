'use client'

import { Dispatch, SetStateAction } from 'react'
import { CloudCheckIcon } from 'lucide-react'
import { Button } from '@/components'
import { useRouter } from 'next/navigation'

const FileUploadSuccess = ({ setFile }: { setFile: Dispatch<SetStateAction<File | null>> }) => {
  const router = useRouter()

  return (
    <div className={'w-200 my-30 mx-auto'}>
      <CloudCheckIcon className={'mx-auto size-15'} />
      <div className={'text-center font-bold text-xl'}>上传成功</div>
      <div className={'flex items-center justify-center gap-15 mt-15'}>
        <Button
          className={'cursor-pointer w-35'}
          variant={'secondary'}
          size={'lg'}
          onClick={() => setFile(null)}
        >
          继续上传
        </Button>
        <Button
          className={'cursor-pointer w-35'}
          variant={'default'}
          size={'lg'}
          onClick={() => router.push('/file')}
        >
          查看文件管理
        </Button>
      </div>
    </div>
  )
}

export default FileUploadSuccess
