'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useFileUpload } from '@/features'
import FileUploadSuccess from '@/features/file/components/upload/FileUploadSuccess'
import { FileArchiveIcon } from 'lucide-react'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Spinner,
} from '@/components'
import { useForm } from 'react-hook-form'
import { FileUploadDTO, fileUploadDTO } from '@mtobdvlb/shared-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'

const FileUploadHandler = ({
  setFile,
  file,
}: {
  file: File
  setFile: Dispatch<SetStateAction<File | null>>
}) => {
  const [uploaded, setUploaded] = useState(false)
  const { fileUpload, isPending } = useFileUpload()
  const form = useForm({
    resolver: zodResolver(fileUploadDTO),
    defaultValues: {
      name: file.name,
      description: '',
    },
  })

  const onSubmit = async (formData: FileUploadDTO) => {
    const { code } = await fileUpload({ ...formData, file })
    if (code) return
    form.reset()
    setUploaded(true)
  }

  if (uploaded) return <FileUploadSuccess setFile={setFile} />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'w-200 mx-auto py-30 '}>
        <Label className={'flex items-center cursor-pointer'}>
          <Input
            className={'size-0 -z-1'}
            type='file'
            onChange={(e) => e.target.files?.[0] && setFile(e.target.files?.[0])}
          />
          <FileArchiveIcon />
          <p>更换文件</p>
        </Label>
        <FormField
          name={'name'}
          render={({ field }) => (
            <FormItem className={'mt-15'}>
              <FormLabel>文件名</FormLabel>
              <FormControl>
                <Input placeholder={'请输入文件名'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={'description'}
          render={({ field }) => (
            <FormItem className={'mt-15'}>
              <FormLabel>文件描述</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={'请输入文件描述'}
                  className={'resize-none'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={'mt-15 cursor-pointer'} type={'submit'}>
          {isPending && <Spinner />}
          上传文件
        </Button>
      </form>
    </Form>
  )
}

export default FileUploadHandler
