import { getPageMetaData } from "@/app/_features/article/api/get-page-metadata"
import {
  ArticleDetail,
  isPageObjectResponse,
} from "@/app/_features/article/types"
import { n2m, notionClient } from "@/app/_lib/notion"

export const getArticleDetail = async (
  id: string,
): Promise<ArticleDetail | undefined> => {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            formula: {
              string: {
                equals: id,
              },
            },
            property: "Status",
          },
          {
            property: "Slug",
            select: {
              equals: "Publish",
            },
          },
        ],
      },
    })

    const pageObject = isPageObjectResponse(res.results[0])
      ? res.results[0]
      : undefined

    if (!pageObject) {
      return undefined
    }

    const content = await n2m(pageObject.id)

    return {
      ...getPageMetaData(pageObject),
      content,
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}
