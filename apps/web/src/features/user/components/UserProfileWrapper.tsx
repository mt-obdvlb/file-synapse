'use client'

import { useUser, useUserGet } from '@/features'
import { useForm } from 'react-hook-form'
import { userUpdateDTO, UserUpdateDTO } from '@mtobdvlb/shared-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useEffect } from 'react'
import UserProfileForm from '@/features/user/components/UserProfileForm'

const UserProfileWrapper = () => {
  const { user } = useUserGet()
  const { userUpdate } = useUser()

  const form = useForm({
    resolver: zodResolver(userUpdateDTO),
    defaultValues: {
      username: user?.username || '',
      password: '',
      confirmedPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        password: '',
        confirmedPassword: '',
      })
    }
  }, [user])

  const onSubmit = async (data: UserUpdateDTO) => {
    const { code } = await userUpdate(data)
    if (code) return
    toast.success('修改成功')
    form.reset({
      username: data.username,
      password: '',
      confirmedPassword: '',
    })
  }

  return <UserProfileForm form={form} onSubmit={onSubmit} />
}

export default UserProfileWrapper
