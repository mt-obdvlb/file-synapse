'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fileDelete, fileDetail, fileDownload, fileList, fileUpload } from '@/apis'
import { FileGetDTO } from '@mtobdvlb/shared-types'

export const useFileDetail = (id: string) => {
  const { data } = useQuery({
    queryKey: ['file', id],
    queryFn: () => fileDetail(id),
    enabled: !!id,
  })
  return {
    fileDetail: data?.data,
  }
}

export const useFileList = (params: FileGetDTO) => {
  const { data } = useQuery({
    queryKey: ['file', 'list', params],
    queryFn: () => fileList(params),
  })
  return {
    fileList: data?.data?.list,
    total: data?.data?.total,
  }
}

export const useFileById = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: fileDeleteAsync } = useMutation({
    mutationFn: fileDelete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['file', 'list'] })
    },
  })
  const { mutateAsync: fileDownloadAsync } = useMutation({
    mutationFn: fileDownload,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['file', 'list'] })
    },
  })
  return {
    fileDelete: fileDeleteAsync,
    fileDownload: fileDownloadAsync,
  }
}

export const useFileUpload = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: fileUpload,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['file', 'list'] })
    },
  })
  return {
    fileUpload: mutateAsync,
    isPending,
  }
}
