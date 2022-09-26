import React, { forwardRef, PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

const DropLink = 
forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>((props, ref) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
})

DropLink.displayName = "DropLink"

export default DropLink