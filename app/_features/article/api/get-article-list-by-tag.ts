import { getPageMetaData } from "@/app/_features/article/api/get-page-metadata"
import { NotionApiError } from "@/app/_features/article/error"
import { Article, isPageObjectResponse } from "@/app/_features/article/types"
import { notionClient } from "@/app/_libs/notion"

export const getArticleListByTag = async (
  tag: string,
): Promise<Article[] | NotionApiError> => {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            multi_select: {
              contains: tag,
            },
            property: "Tags",
          },
          {
            property: "Status",
            select: {
              equals: "Publish",
            },
          },
        ],
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
