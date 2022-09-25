import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: String
}

function SidebarRow({Icon, title}: Props) {
  return (
    <div className=''>
        <Icon className="" />
        <p className=''>{title}</p>
    </div>
  )
}

export default SidebarRow