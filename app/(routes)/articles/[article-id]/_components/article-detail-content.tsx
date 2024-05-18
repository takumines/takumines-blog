import Link from "next/link"
import type {
  ComponentProps,
  CSSProperties,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"

const Heading2 = ({ children }: ComponentProps<"h2">) => {
  return (
    <h2 className="mb-5 mt-9 text-3xl tracking-wide lg:text-4xl">{children}</h2>
  )
}

const Heading3 = ({ children }: ComponentProps<"h3">) => {
  return (
    <h3 className="mb-4 mt-8 text-2xl tracking-wide lg:text-3xl">{children}</h3>
  )
}

const Paragraph = ({ children }: ComponentProps<"p">) => {
  return (
    <p className="mt-4 text-base leading-relaxed tracking-wide">{children}</p>
  )
}

const Strong = ({ children }: ComponentProps<"strong">) => {
  return (
    <strong className="mt-4 text-base font-bold leading-relaxed tracking-wide">
      {children}
    </strong>
  )
}

type Props = {
  children?: ReactNode
  className?: string
  href: string
  style?: CSSProperties
  target?: HTMLAttributeAnchorTarget
}

const Anchor = ({ children, href }: ComponentProps<"a">) => {
  return href?.startsWith("/") || href === "" ? (
    <Link
      className="mt-4 text-base leading-relaxed tracking-wide text-blue underline"
      href={href}
    >
      <a>{children}</a>
    </Link>
  ) : (
    <a
      className="mt-4 text-base leading-relaxed tracking-wide text-blue underline"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  )
}
const Pre = ({ children }: ComponentProps<"pre">) => {
  if (!children || typeof children !== "object") {
    return <code>{children}</code>
  }
  const childType = "type" in children ? children.type : ""
  if (childType !== "code") {
    return <code>{children}</code>
  }

  const childProps = "props" in children ? children.props : {}
  const { children: code, className: languageType } = childProps
  const lang = languageType ? languageType.replace("language-", "") : "text"

  return (
    <SyntaxHighlighter language={lang} style={dracula}>
      {String(code).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}

const overrideComponent = {
  a: Anchor,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  pre: Pre,
  strong: Strong,
}

const ArticleDetailContent = ({ content }: { content: string }) => {
  return (
    <>
      <ReactMarkdown components={overrideComponent}>{content}</ReactMarkdown>
    </>
  )
}

export default ArticleDetailContent
