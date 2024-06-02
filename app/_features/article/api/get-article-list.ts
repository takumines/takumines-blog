import { getPageMetaData } from "@/app/_features/article/api/get-page-metadata"
import { NotionApiError } from "@/app/_features/article/error"
import { isPageObjectResponse } from "@/app/_features/article/types"
import { Article } from "@/app/_features/article/types/type"
import { notionClient } from "@/app/_libs/notion"

/**
 * 記事一覧を取得
 *
 * @returns {Promise<Article[]>}
 */
export const getArticleList = async (): Promise<Article[] | NotionApiError> => {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Status",
        select: {
          equals: "Publish",
        },
      },
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
  } catch (error) {
    return new NotionApiError(error)
  }
}
