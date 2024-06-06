import ArticleDetailContent from "@/app/(routes)/articles/[article-id]/_components/article-detail-content"
import { LinkButton } from "@/app/_components/elements/button"
import { TagIcon } from "@/app/_components/elements/icon/tag-icon"
import { UpdatedAtIcon } from "@/app/_components/elements/icon/updated-at-icon"
import { getArticleDetail } from "@/app/_features/article/api"
import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  NotionApiError,
} from "@/app/_features/article/error"
import { BASE_METADATA } from "@/app/_libs/metadata"
import { Metadata } from "next"

export const dynamic = "force-static"
export const revalidate = 3600

export const generateMetadata = async ({
  params,
}: {
  params: { "article-id": string }
}): Promise<Metadata> => {
  const response = await getArticleDetail(params["article-id"])
  const url = `/articles/${params["article-id"]}`

  if (response instanceof NotionApiError || !response) {
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
  const response = await getArticleDetail(articleId)

  if (response instanceof NotionApiError) {
    return (
      <div className="mx-auto mt-[150px] text-center">
        <h2 className="text-[32px] leading-[1.1] sm:text-[44px]">
          {INTERNAL_SERVER_ERROR_CODE}
        </h2>
        <h1 className="text-[56px] leading-[1.1] sm:text-[88px]">
          INTERNAL
          <br />
          SERVER
          <br />
          ERROR
        </h1>
        <p className="mt-8 text-base">
          エラーが発生しました。お手数をおかけしますが、時間を置いて、もう一度お試しください。
        </p>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="mx-auto mt-[200px] text-center">
        <h2 className="text-[32px] leading-[1.1] sm:text-[44px]">
          {NOT_FOUND_ERROR_CODE}
        </h2>
        <h1 className="text-[56px] leading-[1.1] sm:text-[88px]">Not Found</h1>
        <p className="my-8 text-base">お探しのページが見つかりませんでした</p>
        <LinkButton href="/" textSize="base" variant="primary">
          TOPへ戻る
        </LinkButton>
      </div>
    )
  }

  return (
    <div className="mt-14">
      <header className="flex flex-col">
        <h1 className="text-4xl tracking-normal text-zinc-800 dark:text-zinc-50 sm:text-5xl">
          {response.title}
        </h1>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex">
            {response.tags.map((tag) => (
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
            <p className="ml-1 text-base text-zinc-400">{response.date}</p>
          </div>
        </div>
      </header>
      <ArticleDetailContent content={response.content} />
    </div>
  )
}

export default ArticleDetailPage
