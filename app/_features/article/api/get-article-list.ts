import { getPageMetaData } from "@/app/_features/article/api/get-page-metadata"
import { isPageObjectResponse } from "@/app/_features/article/types"
import { Article } from "@/app/_features/article/types/type"
import { notionClient } from "@/app/_lib/notion"

/**
 * 記事一覧を取得
 *
 * @returns {Promise<Article[]>}
 */
export const getArticleList = async (): Promise<Article[]> => {
  const res = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  })
  const articleList = res.results

  if (!articleList) {
    return []
  }

  return articleList
    .map((article) => {
      const pageObject = isPageObjectResponse(article) ? article : undefined
      if (!pageObject) {
        return pageObject
      }
      return getPageMetaData(pageObject)
    })
    .filter((article): article is Article => !!article)
}
