import Oss from 'ali-oss'
import { getOssConfig } from '@/config'

const ossConfig = getOssConfig()

const ossClient = new Oss({
  bucket: ossConfig.bucket,
  accessKeyId: ossConfig.accessKeyId,
  accessKeySecret: ossConfig.accessKeySecret,
  region: ossConfig.region,
})

export const getUploadURL = async (fileName: string) => {
  const objectKey = `${Date.now()}-${fileName}`
  const url = ossClient.signatureUrl(objectKey, {
    expires: 300,
    method: 'PUT',
    'Content-Type': 'application/octet-stream',
  })
  return {
    url,
    objectKey,
  }
}

/**
 * 在浏览器端上传 File 到 OSS
 * @param file 浏览器 File 对象
 * @returns 上传后的 objectKey 和访问 URL
 */
export const uploadFile = async (file: Express.Multer.File) => {
  const objectKey = `${Date.now()}-${file.originalname}`

  // 获取签名 URL
  const { url } = await getUploadURL(file.originalname)

  // 使用 fetch PUT 上传文件
  await fetch(url, {
    method: 'PUT',
    body: file.buffer,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })

  return {
    objectKey,
    url: url.split('?')[0], // 去掉签名参数，得到可访问的 URL
  }
}
