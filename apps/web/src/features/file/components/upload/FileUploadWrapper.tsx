'use client'

import FileUploadHeader from '@/features/file/components/upload/FileUploadHeader'
import { useState } from 'react'
import FileUpload from '@/features/file/components/upload/FileUpload'
import FileUploadHandler from '@/features/file/components/upload/FileUploadHandler'

const FileUploadWrapper = () => {
  const [file, setFile] = useState<File | null>(null)

  if (file) return <FileUploadHandler file={file} setFile={setFile} />

  return (
    <div className={'flex flex-col '}>
      <header className={'border rounded-md h-50  w-150 mx-auto mt-15 border-gray-300'}>
        <FileUploadHeader />
      </header>
      <main>
        <FileUpload setFile={setFile} />
      </main>
    </div>
  )
}

export default FileUploadWrapper
