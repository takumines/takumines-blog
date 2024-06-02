import { getPageMetaData } from "@/app/_features/article/api/get-page-metadata"
import { NotionApiError } from "@/app/_features/article/error"
import {
  ArticleDetail,
  isPageObjectResponse,
} from "@/app/_features/article/types"
import { n2m, notionClient } from "@/app/_libs/notion"
import { cache } from "react"

export const getArticleDetail = cache(
  async (id: string): Promise<ArticleDetail | NotionApiError | undefined> => {
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
              property: "Slug",
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

      const pageObject =
        res.results.length > 0 && isPageObjectResponse(res.results[0])
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
      return new NotionApiError(error)
    }
  },
)
