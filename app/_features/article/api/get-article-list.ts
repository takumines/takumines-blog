import {
  isMultiSelect,
  isPageObjectResponse,
  isRichText,
  isTitle,
} from "@/app/_features/article/types"
import { Article, MultiSelectType } from "@/app/_features/article/types/type"
import notionClient from "@/app/_lib/notion"
import { formatISODateTimeToDate } from "@/app/_utils/date"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

/**
 * タグの取得
 *
 * @param {MultiSelectType} tags
 * @returns {string[]}
 */
const getTags = (tags: MultiSelectType): string[] => {
  return tags.map((tag) => tag.name)
}

/**
 * 記事一覧を取得
 *
 * @returns {Promise<Article[]>}
 */
const getArticleList = async (): Promise<Article[]> => {
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

/**
 * 記事のメタデータを取得
 *
 * @param {PageObjectResponse} post
 * @returns {Post}
 */
const getPageMetaData = (post: PageObjectResponse): Article => {
  const { created_time, id, properties } = post

  const date = formatISODateTimeToDate(created_time)
  const description = isRichText(properties.Description)
    ? properties.Description.rich_text[0].plain_text
    : ""
  const slug = isRichText(properties.Slug)
    ? properties.Slug.rich_text[0].plain_text
    : ""
  const title = isTitle(properties.Name)
    ? properties.Name.title[0].plain_text
    : ""
  const tags = isMultiSelect(properties.Tags)
    ? getTags(properties.Tags.multi_select)
    : []

  return {
    date,
    description,
    id,
    slug,
    tags,
    title,
  }
}

export default getArticleList
