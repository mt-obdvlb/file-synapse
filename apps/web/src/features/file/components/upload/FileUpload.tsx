'use client'

import { Dispatch, SetStateAction } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/libs'
import { Input } from '@/components'
import { UploadCloudIcon } from 'lucide-react'
import { motion } from 'motion/react'

const FileUpload = ({ setFile }: { setFile: Dispatch<SetStateAction<File | null>> }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return
      setFile(file)
    },
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative rounded-lg border border-gray-400 flex justify-center flex-col items-center cursor-pointer h-100 w-200 mx-auto my-15 overflow-hidden',
        isDragActive && 'border-none'
      )}
    >
      <Input className={'size-0 -z-1'} {...getInputProps()} />
      <UploadCloudIcon className={'size-25'} />
      <p className={'text-center'}>拖拽或点击来上传文件</p>

      {isDragActive && (
        <motion.svg className='absolute inset-0 w-full h-full pointer-events-none'>
          <motion.rect
            x={1}
            y={1}
            rx={8}
            ry={8}
            fill='none'
            strokeWidth={2}
            strokeDasharray='12 6'
            animate={{ strokeDashoffset: [0, 18] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className={'w-[calc(100%-2px)] h-[calc(100%-2px)] stroke-primary'}
          />
        </motion.svg>
      )}
    </div>
  )
}

export default FileUpload
