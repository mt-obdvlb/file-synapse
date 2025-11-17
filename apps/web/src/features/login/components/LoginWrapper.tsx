'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components'
import { BorderBeam } from '@/components/ui/border-beam'
import { useForm } from 'react-hook-form'
import { userLoginDTO, UserLoginDTO } from '@mtobdvlb/shared-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { Input } from '@/components/ui/input'
import { useUser, useUserGet } from '@/features'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LoginWrapper = () => {
  const form = useForm<UserLoginDTO>({
    resolver: zodResolver(userLoginDTO),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { userLogin } = useUser()
  const { user } = useUserGet()
  const router = useRouter()

  useEffect(() => {
    if (user?.id) {
      router.push('/')
    }
  }, [user?.id])

  const onSubmit = async (data: UserLoginDTO) => {
    const { code } = await userLogin(data)
    if (code) return
    router.push('/')
  }

  return (
    <Card className={'md:w-100 w-150 relative'}>
      <CardHeader>
        <CardTitle>文件管理系统</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              name={'username'}
              render={({ field }) => (
                <FormItem className={'mt-5'}>
                  <FormLabel>账号</FormLabel>
                  <FormControl>
                    <Input placeholder={'请输入用户名'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'password'}
              render={({ field }) => (
                <FormItem className={'my-5'}>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input type={'password'} placeholder={'请输入密码'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <InteractiveHoverButton className={'ml-auto rounded-md w-50'} type={'submit'}>
              登录
            </InteractiveHoverButton>
          </CardFooter>
        </form>
      </Form>

      <BorderBeam duration={8} size={100} />
    </Card>
  )
}

export default LoginWrapper
