'use client'

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

const Login = () => {
  return (
    <div className={'size-full flex items-center justify-center bg-primary-foreground'}>
      <AnimatedThemeToggler />
    </div>
  )
}

export default Login
