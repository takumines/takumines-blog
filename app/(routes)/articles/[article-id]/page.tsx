import ArticleDetailContent from "@/app/(routes)/articles/[article-id]/_components/article-detail-content"
import { getArticleDetail } from "@/app/_features/article/api"
import { BASE_METADATA } from "@/app/_lib/metadata"
import { Metadata } from "next"

export const generateMetadata = async ({
  params,
}: {
  params: { "article-id": string }
}): Promise<Metadata> => {
  const response = await getArticleDetail(params["article-id"])
  const url = `/articles/${params["article-id"]}`

  // NOTE: responseがない時と、responseがResponse型の時はデフォルト値を設定
  if (!response || response instanceof Response) {
    const titleForError = "記事詳細 | takumines blog"
    return {
      ...BASE_METADATA,
      alternates: {
        canonical: url,
      },
      openGraph: {
        ...BASE_METADATA.openGraph,
        title: titleForError,
        url,
      },
      title: titleForError,
      twitter: {
        ...BASE_METADATA.twitter,
        title: titleForError,
      },
    }
  }

  return {
    ...BASE_METADATA,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...BASE_METADATA.openGraph,
      images: response.thumbnail,
      title: `${response.title} | takumines blog`,
      url,
    },
    title: `${response.title} | takumines blog`,
    twitter: {
      ...BASE_METADATA.twitter,
      images: response.thumbnail,
      title: `${response.title} | takumines blog`,
    },
  }
}

const ArticleDetailPage = async ({
  params: { "article-id": articleId },
}: {
  params: { "article-id": string }
}) => {
  const article = await getArticleDetail(articleId)

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <>
      <ArticleDetailContent content={article.content} />
    </>
  )
}

export default ArticleDetailPage
