import { Metadata } from "next"
import { Suspense } from "react"

import ArticleSummaryCard from "@/app/(routes)/(top)/_components/article-summary-card"
import { Spinner } from "@/app/_components/elements/spinner"
import { getArticleListByTag, getTagList } from "@/app/_features/article/api"
import {
  INTERNAL_SERVER_ERROR_CODE,
  NotionApiError,
} from "@/app/_features/article/error"
import { BASE_METADATA } from "@/app/_libs/metadata"

export const dynamic = "force-static"
export const revalidate = 3600

export const generateStaticParams = async () => {
  const tagList = await getTagList()

  if (tagList instanceof NotionApiError) {
    return []
  }

  return tagList.map((tag) => ({
    "tag-id": tag.description,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ "tag-id": string }>
}): Promise<Metadata> => {
  const { "tag-id": tagId } = await params
  const url = `/tags/${tagId}`
  // タグ一覧からタグID(Notionで設定したタグのdescription)に紐づくタグ名を取得
  const tagList = await getTagList()

  if (tagList instanceof NotionApiError) {
    return {
      ...BASE_METADATA,
      alternates: {
        canonical: url,
      },
      openGraph: {
        ...BASE_METADATA.openGraph,
        url,
      },
    }
  }

  const tag =
    tagList.find((tag) => tag.description === tagId)?.name ||
    tagId
  const title = `${tag}の記事一覧 | takumines blog`

  return {
    ...BASE_METADATA,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...BASE_METADATA.openGraph,
      title,
      url,
    },
    title,
    twitter: {
      ...BASE_METADATA.twitter,
      title,
    },
  }
}

const ErrorPage = () => {
  return (
    <div className="mx-auto mt-[150px] text-center">
      <h2 className="text-[32px] leading-[1.1] text-zinc-800 dark:text-zinc-50 sm:text-[44px]">
        {INTERNAL_SERVER_ERROR_CODE}
      </h2>
      <h1 className="text-[56px] leading-[1.1] text-zinc-800 dark:text-zinc-50 sm:text-[88px]">
        INTERNAL
        <br />
        SERVER
        <br />
        ERROR
      </h1>
      <p className="mt-8 text-base text-zinc-800 dark:text-zinc-50">
        エラーが発生しました。お手数をおかけしますが、時間を置いて、もう一度お試しください。
      </p>
    </div>
  )
}

const ArticleListByTag = async ({ tagId }: { tagId: string }) => {
  // タグ一覧からタグID(Notionで設定したタグのdescription)に紐づくタグ名を取得
  const tagList = await getTagList()
  if (tagList instanceof NotionApiError) {
    return <ErrorPage />
  }
  // 該当するタグが存在しない場合は空文字を格納
  const tag = tagList.find((tag) => tag.description === tagId)?.name || tagId
  const response = await getArticleListByTag(tag)

  if (response instanceof NotionApiError) {
    return <ErrorPage />
  }

  return (
    <div className="mt-14">
      <h1 className="mb-6 text-center text-3xl tracking-normal text-zinc-800 dark:text-zinc-50 sm:text-4xl">
        {tag}の記事一覧
      </h1>
      {response.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-9">
          {response.map((article) => (
            <ArticleSummaryCard article={article} key={article.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[14px] font-medium text-zinc-800 dark:text-zinc-50">
          表示できる記事がありません。
        </p>
      )}
    </div>
  )
}

const TagPage = async ({
  params,
}: {
  params: Promise<{ "tag-id": string }>
}) => {
  const { "tag-id": tagId } = await params
  return (
    <article className="mt-14">
      <Suspense fallback={<Spinner className="flex justify-center" />}>
        <ArticleListByTag tagId={tagId} />
      </Suspense>
    </article>
  )
}

export default TagPage
