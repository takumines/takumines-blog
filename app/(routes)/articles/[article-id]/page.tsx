import ArticleDetailContent from "@/app/(routes)/articles/[article-id]/_components/article-detail-content"
import TagIcon from "@/app/_components/elements/icon/tag-icon"
import UpdatedAtIcon from "@/app/_components/elements/icon/updated-at-icon"
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
    <div className="mt-14">
      <header className="flex flex-col">
        <h1 className="text-4xl tracking-normal text-zinc-800 sm:text-5xl">
          {article.title}
        </h1>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex">
            {article.tags.map((tag) => (
              <div className="mr-3 flex items-center" key={tag}>
                <TagIcon
                  className="text-green-400 drop-shadow-[0_0px_4px_rgba(0,0,0,0.2)]"
                  height={16}
                  width={16}
                />
                <p className="ml-1 text-base text-green-500 drop-shadow-[0_0px_4px_rgba(0,0,0,0.2)]">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-start">
            <UpdatedAtIcon className="text-zinc-400" height={20} width={20} />
            <p className="ml-1 text-base text-zinc-400">{article.date}</p>
          </div>
        </div>
      </header>
      <ArticleDetailContent content={article.content} />
    </div>
  )
}

export default ArticleDetailPage
