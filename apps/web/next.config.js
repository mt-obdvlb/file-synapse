/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'mtobdvlb-web.oss-cn-beijing.aliyuncs.com',
        pathname: '/**', // ** 表示匹配任意子路径
      },
    ],
  },
}

export default nextConfig
