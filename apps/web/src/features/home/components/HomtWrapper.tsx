'use clint'

import { FileClockIcon, FileIcon, UploadCloudIcon, UserIcon, UserPlusIcon } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import WithAdmin from '@/components/hoc/WithAdmin'

const features = [
  {
    Icon: UserIcon,
    name: '个人信息',
    description: '你可以更改个人信息',
    href: '/profile',
    cta: '跳转',
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
    background: <></>,
  },
  {
    Icon: UploadCloudIcon,
    name: '上传文件',
    description: '你可以上传文件',
    href: '/upload',
    cta: '跳转',
    background: <></>,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: FileIcon,
    name: '文件管理',
    description: '你可以管理下载查看文件',
    href: '/file',
    cta: '跳转',
    background: <></>,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: FileClockIcon,
    name: '操作记录',
    description: '你可以查看操作记录',
    href: '/log',
    cta: '跳转',
    background: <></>,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
]

const HomeWrapper = () => {
  return (
    <BentoGrid className='lg:grid-rows-3'>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
      <WithAdmin>
        <BentoCard
          Icon={UserPlusIcon}
          name='用户管理'
          description='你可以新增用户'
          href='/user'
          cta='跳转'
          background={<></>}
          className='lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4'
        />
      </WithAdmin>
    </BentoGrid>
  )
}

export default HomeWrapper
