import ReactMarkdown from "react-markdown"

const ArticleDetailContent = ({ content }: { content: string }) => {
  return (
    <>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  )
}

export default ArticleDetailContent
