import ArticleSummaryCard from "@/app/(routes)/(top)/_components/article-summary-card"
import { Spinner } from "@/app/_components/elements/spinner/spinner"
import { getArticleList } from "@/app/_features/article/api"
import {
  INTERNAL_SERVER_ERROR_CODE,
  NotionApiError,
} from "@/app/_features/article/error"
import { BASE_METADATA } from "@/app/_libs/metadata"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamic = "force-static"

/**
 * NOTE: notion APIで取得される画像の有効期限は1時間なので、revalidateを1時間に設定し期限切れを防ぐ
 * @see https://developers.notion.com/docs/working-with-files-and-media#retrieving-files-and-media-via-the-notion-api
 */
export const revalidate = 3600

export const metadata: Metadata = {
  ...BASE_METADATA,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: "/",
  },
}

const ArticleList = async () => {
  const response = await getArticleList()

  if (response instanceof NotionApiError) {
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

  return response.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-9">
      {response.map((article) => (
        <ArticleSummaryCard article={article} key={article.id} />
      ))}
    </div>
  ) : (
    <p className="text-center text-[14px] font-medium text-zinc-800 dark:text-zinc-50">
      表示できる記事がありません。
    </p>
  )
}

const Top = () => {
  return (
    <article className="mt-14">
      <Suspense fallback={<Spinner className="flex justify-center" />}>
        <ArticleList />
      </Suspense>
    </article>
  )
}

export default Top
