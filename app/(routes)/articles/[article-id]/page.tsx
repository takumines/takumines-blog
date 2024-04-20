const ArticleDetailPage = ({
  params: { "article-id": articleId },
}: {
  params: { "article-id": string }
}) => {
  return <div>Article {articleId}</div>
}

export default ArticleDetailPage
