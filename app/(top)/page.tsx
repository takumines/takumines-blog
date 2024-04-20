import ArticleSummaryCard from "@/app/(top)/_components/article-summary-card"

const ArticleList = () => {
  return (
    <div className="grid grid-cols-2 gap-9">
      {[...Array(4)].map((_, i) => (
        <ArticleSummaryCard key={i} />
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
