import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Tag = ({ children }: Props) => {
  return (
    <span className="text-base text-green-400 drop-shadow-[0_0px_4px_rgba(0,0,0,0.2)]">
      {children}
    </span>
  )
}
