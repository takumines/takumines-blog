import NextImage from "next/image"
import Link from "next/link"
import { ComponentProps } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"

const Heading2 = ({ children }: ComponentProps<"h2">) => {
  return (
    <h2 className="mb-5 mt-9 text-3xl tracking-wide text-zinc-800 sm:text-4xl">
      {children}
    </h2>
  )
}

const Heading3 = ({ children }: ComponentProps<"h3">) => {
  return (
    <h3 className="mb-4 mt-8 text-2xl tracking-wide text-zinc-800 sm:text-3xl">
      {children}
    </h3>
  )
}

const Paragraph = ({ children }: ComponentProps<"p">) => {
  return (
    <p className="mt-4 text-base leading-relaxed tracking-wide text-zinc-600">
      {children}
    </p>
  )
}

const Strong = ({ children }: ComponentProps<"strong">) => {
  return (
    <strong className="mt-4 text-base font-bold leading-relaxed tracking-wide text-zinc-600">
      {children}
    </strong>
  )
}

const Anchor = ({ children, href }: ComponentProps<"a">) => {
  return href?.startsWith("/") || href === "" ? (
    <Link
      className="mt-4 text-base leading-relaxed tracking-wide text-green-500 underline"
      href={href}
    >
      <a>{children}</a>
    </Link>
  ) : (
    <a
      className="mt-4 text-base leading-relaxed tracking-wide text-green-500 underline"
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

const UnorderedList = ({ children }: ComponentProps<"ul">) => {
  return <ul className="list-inside list-disc">{children}</ul>
}

const OrderedList = ({ children }: ComponentProps<"ol">) => {
  return <ol className="list-inside list-decimal">{children}</ol>
}

const ListItem = ({ children }: ComponentProps<"li">) => {
  return (
    <li className="text-base leading-relaxed tracking-wide text-zinc-600">
      {children}
    </li>
  )
}

const Image = (props: ComponentProps<"img">) => {
  return (
    <NextImage
      alt={`画像の説明: ${props.alt ?? ""}`}
      height={800}
      src={props.src ?? "/images/default_thumbnail.png"}
      style={{
        height: "auto",
        width: "100%",
      }}
      width={800}
    />
  )
}

const overrideComponent = {
  a: Anchor,
  h2: Heading2,
  h3: Heading3,
  img: Image,
  li: ListItem,
  ol: OrderedList,
  p: Paragraph,
  pre: Pre,
  strong: Strong,
  ul: UnorderedList,
}

const ArticleDetailContent = ({ content }: { content: string }) => {
  return (
    <>
      <ReactMarkdown components={overrideComponent}>{content}</ReactMarkdown>
    </>
  )
}

export default ArticleDetailContent
