import ArticleSummaryCard from "@/app/(routes)/(top)/_components/article-summary-card"
import { Spinner } from "@/app/_components/elements/spinner/spinner"
import { getArticleList } from "@/app/_features/article/api"
import { NotionApiError } from "@/app/_features/article/error"
import { BASE_METADATA } from "@/app/_lib/metadata"
import { Metadata } from "next"
import { Suspense } from "react"

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
      <div className="mx-auto mt-[200px] text-center">
        <h2 className="text-[32px] leading-[1.1] sm:text-[44px]">
          {response.statusCode}
        </h2>
        <h1 className="text-[56px] leading-[1.1] sm:text-[88px]">
          INTERNAL SERVER ERROR
        </h1>
        <p className="mb-8 text-base">
          エラーが発生しました。お手数をおかけしますが、時間を置いて、もう一度お試しください。
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-9">
      {response.map((article) => (
        <ArticleSummaryCard article={article} key={article.id} />
      ))}
    </div>
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
