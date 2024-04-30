import ArticleDetailContent from "@/app/(routes)/articles/[article-id]/_components/article-detail-content"
import { getArticleDetail } from "@/app/_features/article/api"

const ArticleDetailPage = async ({
  params: { "article-id": articleId },
}: {
  params: { "article-id": string }
}) => {
  const article = await getArticleDetail(articleId)

  if (!article) {
    return <div>Article not found</div>
  }

  console.log(article)

  return (
    <>
      <div>Article {articleId}</div>
      <ArticleDetailContent content={article.content} />
    </>
  )
}

export default ArticleDetailPage
