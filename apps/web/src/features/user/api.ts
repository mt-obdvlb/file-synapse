'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userGet, userLogin, userRegister, userUpdate } from '@/apis'
import { useUserStore } from '@/features/user/store'

export const useUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: userUpdateAsync } = useMutation({
    mutationFn: userUpdate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const { mutateAsync: userLoginAsync } = useMutation({
    mutationFn: userLogin,
  })

  const { mutateAsync: userRegisterAsync } = useMutation({
    mutationFn: userRegister,
  })

  return {
    userUpdate: userUpdateAsync,
    userLogin: userLoginAsync,
    userRegister: userRegisterAsync,
  }
}

export const useUserGet = () => {
  const setUser = useUserStore((state) => state.setUser)

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: userGet,
  })

  useEffect(() => {
    if (data?.data) {
      setUser(data.data)
    }
  }, [data, setUser])

  return {
    user: data?.data,
  }
}
