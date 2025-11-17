'use client'

import { useUser, useUserGet } from '@/features'
import NeedAdmin from '@/components/layout/NeedAdmin'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRegisterDTO, userRegisterDTO } from '@mtobdvlb/shared-types'
import { toast } from 'sonner'
import UserProfileForm from '@/features/user/components/UserProfileForm'

const UserProfileRegisterWrapper = () => {
  const { user, isPending } = useUserGet()
  const { userRegister } = useUser()

  const form = useForm<UserRegisterDTO>({
    resolver: zodResolver(userRegisterDTO),
    defaultValues: {
      username: '',
      password: '',
      confirmedPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: UserRegisterDTO) => {
    const { code } = await userRegister(data)
    if (code) return
    toast.success('新增用户成功')
    form.reset({
      username: '',
      password: '',
      confirmedPassword: '',
    })
  }
  if (isPending) return null
  if (!user?.isAdmin) {
    return <NeedAdmin />
  }
  return <UserProfileForm form={form} onSubmit={onSubmit} title={'新增用户'} />
}

export default UserProfileRegisterWrapper
