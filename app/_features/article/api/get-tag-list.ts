import { NotionApiError } from "@/app/_features/article/error"
import {
  isMultiSelectForDatabaseProperty,
  MultiSelectForDatabaseProperty,
  Tag,
} from "@/app/_features/article/types"
import { notionClient } from "@/app/_libs/notion"

export const getTagList = async (): Promise<NotionApiError | Tag[]> => {
  try {
    const res = await notionClient.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID!,
    })

    const tags = isMultiSelectForDatabaseProperty(res.properties.Tags)
      ? getTags(res.properties.Tags.multi_select)
      : []

    if (tags.length === 0) {
      return []
    }

    return tags
  } catch (error) {
    return new NotionApiError(error)
  }
}

/**
 * タグの取得
 *
 * @param { MultiSelect }tags
 * @returns {string[]}
 */
const getTags = (tags: MultiSelectForDatabaseProperty): Tag[] => {
  return tags.options.map((tag) => {
    return {
      description: tag.description!,
      name: tag.name,
    }
  })
}
