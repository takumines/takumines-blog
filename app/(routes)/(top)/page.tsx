import ArticleSummaryCard from "@/app/(routes)/(top)/_components/article-summary-card"
import getArticleList from "@/app/_features/article/api/get-article-list"

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
      <ArticleList />
    </div>
  )
}

export default Top
