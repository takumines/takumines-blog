import {
  MultiSelect,
  MultiSelectForDatabaseProperty,
  URL,
} from "@/app/_features/article/types/type"
import {
  PageObjectResponse,
  QueryDatabaseResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

export const isPageObjectResponse = (
  post: QueryDatabaseResponse["results"][number],
): post is PageObjectResponse => {
  return post.object === "page"
}

/**
 * PropertyがRichTextかどうかを判定する
 *
 * @param property
 * @returns {property is {rich_text: Array<RichTextItemResponse>}}
 */
export const isRichText = (
  property: any,
): property is { rich_text: Array<RichTextItemResponse> } => {
  return property && property.type === "rich_text"
}

/**
 * PropertyがTitleかどうかを判定する
 *
 * @param property
 * @returns {property is {title: Array<RichTextItemResponse>}}
 */
export const isTitle = (
  property: any,
): property is { title: Array<RichTextItemResponse> } => {
  return property && property.type === "title"
}

/**
 * PropertyがMultiSelectかどうかを判定する
 *
 * @param property
 * @returns {property is {multi_select: MultiSelect}}
 */
export const isMultiSelect = (
  property: any,
): property is { multi_select: MultiSelect } => {
  return property && property.type === "multi_select"
}

/**
 * PropertyがURLかどうかを判定する
 *
 * @param property
 * @returns {property is {url: URL}}
 */
export const isUrl = (property: any): property is { url: URL } => {
  return property && property.type === "url"
}

/**
 * DatabaseObjectResponseのプロパティがMultiSelectかどうかを判定する
 *
 * @param property
 * @returns {property is {multi_select: MultiSelectForDatabaseProperty}}
 */
export const isMultiSelectForDatabaseProperty = (
  property: any,
): property is {
  multi_select: MultiSelectForDatabaseProperty
} => {
  return property && property.type === "multi_select"
}
