'use client'

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { cn } from '@/libs'
import dayjs from 'dayjs'
import { tv } from 'tailwind-variants'
import { motion, useInView } from 'motion/react'
import { LogGetList, OperationType } from '@mtobdvlb/shared-types'
import { formatFileSize } from '@/utils'

type Props = {
  label: string
  logList: LogGetList
  flippedId: string | null
  setFlippedId: Dispatch<SetStateAction<string | null>>
  index: number
  total: number
}

const operationTypeMap: Record<OperationType, string> = {
  UPLOAD: '上传',
  DOWNLOAD: '下载',
  DELETE: '删除',
  LOGIN: '登录',
  UPDATE_USER: '更新用户',
}

const LogTimeLineItem: React.FC<Props> = ({
  label,
  logList,
  flippedId,
  setFlippedId,
  index,
  total,
}) => {
  const timeLineItemStyles = tv({
    slots: {
      base: cn('relative group flex'),
      labelItem: cn('absolute top-0 right-full h-full flex flex-col justify-between'),
      anchorItem: cn('w-8 mr-10 flex flex-col items-center justify-center'),
      contentItem: cn('flex-1 min-h-[calc(16px*2)]'),
      sectionCard: cn('grid-cols-4 grid gap-y-12 gap-x-4  pb-25 group-last-of-type:pb-0'),
      cardWrapper: cn(
        'flex relative w-full h-full min-h-[128px]   py-1 perspective-[1000px] overflow-hidden cursor-pointer',
        'hover:scale-[1.02] transition-all duration-300'
      ),
      cardInner: cn(
        'relative w-full h-full transform-style-preserve-3d transition-transform duration-600 ease-in-out'
      ),
      cardFront: cn(
        'absolute w-full h-full p-4 rounded-xl shadow-sm border border-gray-150 bg-background overflow-hidden',
        'backface-hidden rotate-y-0',
        'hover:shadow-md'
      ),
      cardBack: cn(
        'absolute w-full h-full p-4 rounded-xl shadow-sm border border-gray-150 bg-background overflow-hidden',
        'backface-hidden -rotate-y-180'
      ),
    },
  })

  const {
    base,
    anchorItem,
    contentItem,
    labelItem,
    sectionCard,
    cardWrapper,
    cardBack,
    cardFront,
    cardInner,
  } = timeLineItemStyles()

  const sectionRef = useRef<HTMLElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)

  const [isFixed, setIsFixed] = useState(false)
  const [type, setType] = useState<'top' | 'bottom' | 'normal'>('normal')
  const labelOffsetRef = useRef<number | null>(null)
  const labelHeightRef = useRef<number>(0)
  const fixedModeRef = useRef<'top' | 'bottom' | null>(null)
  const rafRef = useRef<number | null>(null)

  const upperBound = 94 + 36 * index
  const lowerBound = 72 + (total - 1 - index) * 32

  useEffect(() => {
    const compute = () => {
      const s = sectionRef.current
      const l = labelRef.current
      if (!s || !l) return
      const sRect = s.getBoundingClientRect()
      const lRect = l.getBoundingClientRect()
      labelOffsetRef.current = lRect.top - sRect.top
      labelHeightRef.current = lRect.height || l.offsetHeight || 0
    }

    const id = requestAnimationFrame(compute)
    window.addEventListener('resize', compute)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', compute)
    }
  }, [logList.length])

  useEffect(() => {
    const HYST = 6

    const update = () => {
      rafRef.current = null
      const s = sectionRef.current
      const l = labelRef.current
      if (!s || !l) return

      const rect = s.getBoundingClientRect()
      const viewportH = window.innerHeight

      const offset = labelOffsetRef.current ?? l.getBoundingClientRect().top - rect.top
      const naturalTop = rect.top + (offset ?? 0)
      const labelHeight = labelHeightRef.current || l.getBoundingClientRect().height

      const naturalBottom = naturalTop + labelHeight

      let newFixedMode: 'top' | 'bottom' | null = null

      if (fixedModeRef.current === 'top') {
        if (naturalTop <= upperBound + HYST) newFixedMode = 'top'
        else newFixedMode = null
      } else if (fixedModeRef.current === 'bottom') {
        if (naturalBottom >= viewportH - lowerBound - HYST) newFixedMode = 'bottom'
        else newFixedMode = null
      } else {
        if (naturalTop <= upperBound - HYST) newFixedMode = 'top'
        else if (naturalBottom >= viewportH - lowerBound + HYST) newFixedMode = 'bottom'
      }

      const isFixedNew = newFixedMode !== null
      const typeNew =
        newFixedMode === 'top' ? 'top' : newFixedMode === 'bottom' ? 'bottom' : 'normal'

      if (fixedModeRef.current !== newFixedMode) fixedModeRef.current = newFixedMode
      if (isFixedNew !== isFixed) setIsFixed(isFixedNew)
      if (typeNew !== type) setType(typeNew)
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [upperBound, lowerBound, logList.length, isFixed, type])

  const styleProps: React.CSSProperties = {
    top: isFixed && type === 'top' ? `${upperBound}px` : undefined,
    bottom: isFixed && type === 'bottom' ? `${lowerBound}px` : undefined,
  }

  const viewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(viewRef, { margin: '0px' })

  const handleClick = () => {
    if (!sectionRef.current) return
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className={base()}>
      <div className={labelItem()}>
        <div
          ref={labelRef}
          style={styleProps}
          className={cn('text-text2 relative z-99 transition-all duration-300', isFixed && 'fixed')}
        >
          <div
            onClick={handleClick}
            className='hover:text-brand_blue absolute top-0 right-full cursor-pointer text-[16px] leading-[1] font-medium whitespace-nowrap transition-colors duration-300'
          >
            {label}
          </div>
          <div className='absolute top-0 left-4 flex size-4 -translate-x-1/2 items-center justify-center'>
            <div
              className={cn(
                'border-gray-400 bg-background size-4 rounded-full border-2 transition-all duration-300',
                !inView && 'size-1'
              )}
            ></div>
          </div>
        </div>
      </div>
      <div className={anchorItem()}>
        <div></div>
        <div className='bg-[#C9CCD0] w-[2px] flex-1'></div>
      </div>
      <div className={contentItem()}>
        <div ref={viewRef} className={sectionCard()}>
          {logList.map((item) => {
            const isFlipped = flippedId === item.log.id
            return (
              <div
                key={item.log.id}
                className={cn(
                  cardWrapper(),
                  'cursor-pointer hover:scale-[1.02] transition-all duration-300',
                  // 为不同操作类型添加细微颜色区分
                  item.log.operationType === 'UPLOAD' && 'hover:shadow-green-100',
                  item.log.operationType === 'DELETE' && 'hover:shadow-red-100',
                  item.log.operationType === 'UPDATE_USER' && 'hover:shadow-blue-100'
                )}
                onClick={() => setFlippedId(isFlipped ? null : item.log.id)}
              >
                <motion.div className={cn(cardInner())}>
                  {/* 卡片正面 */}
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                    }}
                    initial={false}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                    className={cn(cardFront(), 'h-full')}
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <p className='text-sm font-medium flex items-center gap-1.5'>
                        <span className='w-2 h-2 rounded-full bg-primary'></span>
                        {item.user.name}
                      </p>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full
                ${
                  item.log.operationType === 'UPLOAD'
                    ? 'bg-green-100 text-green-700'
                    : item.log.operationType === 'DELETE'
                      ? 'bg-red-100 text-red-700'
                      : item.log.operationType === 'UPDATE_USER'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                }`}
                      >
                        {operationTypeMap[item.log.operationType]}
                      </span>
                    </div>

                    <p className='text-xs text-gray-500 mb-1.5'>
                      {dayjs(item.log.operationTime).format('YYYY-MM-DD HH:mm')}
                    </p>

                    {/* 文件信息展示（如果存在） */}
                    {item.file && (
                      <div className='mt-2 pt-2 border-t border-gray-100'>
                        <p className='text-xs font-medium truncate'>{item.file.name}</p>
                        <p className='text-[10px] text-gray-400 mt-0.5'>
                          {item.file.type} · {formatFileSize(item.file.size)}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* 卡片背面 */}
                  <motion.div
                    initial={false}
                    animate={{
                      rotateY: isFlipped ? 0 : -180,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                    className={cn(cardBack(), 'h-full')}
                  >
                    <p className='text-sm font-semibold mb-3 pb-1.5 border-b border-gray-200'>
                      详细信息
                    </p>

                    <div className='space-y-2 text-xs'>
                      <div>
                        <span className='text-gray-500'>操作人：</span>
                        <span className='font-medium'>{item.user.name}</span>
                      </div>

                      <div>
                        <span className='text-gray-500'>操作类型：</span>
                        <span>{operationTypeMap[item.log.operationType]}</span>
                      </div>

                      <div>
                        <span className='text-gray-500'>操作时间：</span>
                        <span>{dayjs(item.log.operationTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                      </div>

                      <div>
                        <span className='text-gray-500'>操作ID：</span>
                        <span className='text-gray-400 truncate'>{item.log.id}</span>
                      </div>

                      {/* 文件详细信息 */}
                      {item.file && (
                        <div className='mt-2 pt-2 border-t border-gray-100'>
                          <p className='text-xs font-medium mb-1.5'>文件信息</p>
                          <div className='space-y-1'>
                            <div>
                              <span className='text-gray-500'>文件名：</span>
                              <span className='truncate'>{item.file.name}</span>
                            </div>
                            <div>
                              <span className='text-gray-500'>文件类型：</span>
                              <span>{item.file.type}</span>
                            </div>
                            <div>
                              <span className='text-gray-500'>文件大小：</span>
                              <span>{formatFileSize(item.file.size)}</span>
                            </div>
                            {item.file.description && (
                              <div>
                                <span className='text-gray-500'>描述：</span>
                                <span className='text-gray-600'>{item.file.description}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LogTimeLineItem
