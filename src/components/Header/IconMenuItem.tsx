import * as React from 'react'

interface MenuIconProps {
  icon: React.ReactNode
  text: string
}

export function IconMenuItem({ icon, text }: MenuIconProps) {
  return (
    <div className='flex items-center justify-start space-x-2'>
      {icon}
      <p className='text-sm'>{text}</p>
    </div>
  )
}
