import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components'
import { tv } from 'tailwind-variants'
import { cn } from '@/libs'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

const UserProfileForm = ({
  onSubmit,
  form,
}: {
  onSubmit: SubmitHandler<FieldValues>
  form: UseFormReturn
}) => {
  const formStyles = tv({
    slots: {
      item: cn('flex flex-col pr-10'),
      control: cn('flex'),
      label: cn('w-45 '),
    },
  })

  const { item, control, label } = formStyles()
  return (
    <Form {...form}>
      <form
        className='border  border-zinc-600 rounded-xl w-150 h-auto px-5 py-10 flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* 用户名 */}
        <FormField
          name='username'
          render={({ field }) => (
            <FormItem className={item()}>
              <div className={control()}>
                <FormLabel className={label()}>用户名</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='请输入用户名' />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 密码 */}
        <FormField
          name='password'
          render={({ field }) => (
            <FormItem className={item()}>
              <div className={control()}>
                <FormLabel className={label()}>密码</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='请输入新密码' />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 确认密码 */}
        <FormField
          name='confirmedPassword'
          render={({ field }) => (
            <FormItem className={item()}>
              <div className={control()}>
                <FormLabel className={label()}>确认密码</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='请再次输入密码' />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 提交按钮 */}
        <Button
          type='submit'
          className='mt-3 w-35 mx-auto cursor-pointer'
          disabled={form.formState.isSubmitting}
        >
          保存修改
        </Button>
      </form>
    </Form>
  )
}

export default UserProfileForm
