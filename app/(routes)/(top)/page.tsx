import ArticleSummaryCard from "@/app/(routes)/(top)/_components/article-summary-card"
import Spinner from "@/app/_components/elements/spinner/spinner"
import { getArticleList } from "@/app/_features/article/api"
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
  const articleList = await getArticleList()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-9">
      {articleList.map((article) => (
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
