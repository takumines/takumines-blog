import ArticleSummaryCard from "@/app/(routes)/(top)/_components/article-summary-card"
import Spinner from "@/app/_components/elements/spinner/spinner"
import getArticleList from "@/app/_features/article/api/get-article-list"
import { Suspense } from "react"

const ArticleList = async () => {
  const articleList = await getArticleList()

  return (
    <div className="grid grid-cols-2 gap-9">
      {articleList.map((article) => (
        <ArticleSummaryCard article={article} key={article.id} />
      ))}
    </div>
  )
}

const Top = () => {
  return (
    <div className="mt-[56px]">
      <Suspense fallback={<Spinner className="mx-auto" />}>
        <ArticleList />
      </Suspense>
    </div>
  )
}

export default Top
