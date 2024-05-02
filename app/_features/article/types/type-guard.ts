import { Files, MultiSelect } from "@/app/_features/article/types/type"
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
 * @returns {property is {multi_select: MultiSelectType}}
 */
export const isMultiSelect = (
  property: any,
): property is { multi_select: MultiSelect } => {
  return property && property.type === "multi_select"
}

/**
 * PropertyがFilesかどうかを判定する
 *
 * @param property
 * @returns {property is {files: FilesType}}
 */
export const isFiles = (property: any): property is { files: Files } => {
  return property && property.type === "files"
}
