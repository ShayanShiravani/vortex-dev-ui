import React from "react";
import { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <div className={'card border bg-card w-full px-4 mb-2'}>
      {children}
    </div>
  )
}

export default Card