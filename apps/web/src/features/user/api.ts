'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userGet, userLogin, userLogout, userRegister, userUpdate } from '@/apis'
import { useUserStore } from '@/features/user/store'
import { useRouter } from 'next/navigation'

export const useUser = () => {
  const queryClient = useQueryClient()
  const { clearUser } = useUserStore()
  const router = useRouter()

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

  const { mutateAsync: userLogoutAsync } = useMutation({
    mutationFn: userLogout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      clearUser()
      router.push('/login')
    },
  })

  return {
    userUpdate: userUpdateAsync,
    userLogin: userLoginAsync,
    userRegister: userRegisterAsync,
    userLogout: userLogoutAsync,
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
