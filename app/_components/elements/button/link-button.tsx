import { clsx } from "clsx"
import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  href: string
  target?: "_blank" | "_self"
  textSize: "base"
  variant: "primary"
}

const variantStyles = {
  primary: "bg-green-400 hover:bg-green-500 text-white",
}

const textSizeStyles = {
  base: "px-6 py-3 text-base",
}

export const LinkButton = ({
  children,
  href,
  target = "_self",
  textSize,
  variant,
}: Props) => {
  return (
    <Link
      className={clsx(
        `inline-block rounded bg-white px-6 py-3 text-base`,
        variantStyles[variant],
        textSizeStyles[textSize],
      )}
      href={href}
      target={target}
    >
      {children}
    </Link>
  )
}
