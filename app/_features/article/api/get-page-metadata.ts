import {
  Article,
  Files,
  isFiles,
  isMultiSelect,
  isRichText,
  isTitle,
  MultiSelect,
} from "@/app/_features/article/types"
import { formatISODateTimeToDate } from "@/app/_utils/date"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

/**
 * 記事のメタデータを取得
 *
 * @param {PageObjectResponse} post
 * @returns {Post}
 */
export const getPageMetaData = (post: PageObjectResponse): Article => {
  const { created_time, id, properties } = post

  const date = formatISODateTimeToDate(created_time)
  const slug = isRichText(properties.Slug)
    ? properties.Slug.rich_text[0].plain_text
    : ""
  const title = isTitle(properties.Name)
    ? properties.Name.title[0].plain_text
    : ""
  const tags = isMultiSelect(properties.Tags)
    ? getTags(properties.Tags.multi_select)
    : []
  const thumbnail = isFiles(properties.Thumbnail)
    ? getThumbnail(properties.Thumbnail.files)
    : "/images/default_thumbnail.png"

  return {
    date,
    id,
    slug,
    tags,
    thumbnail,
    title,
  }
}

/**
 * タグの取得
 *
 * @param {MultiSelectType} tags
 * @returns {string[]}
 */
const getTags = (tags: MultiSelect): string[] => {
  return tags.map((tag) => tag.name)
}

/**
 * サムネイルの取得
 *
 * @param {FilesType} thumbnail
 * @returns {string}
 */
const getThumbnail = (thumbnail: Files): string => {
  const file = thumbnail[0]
  return file?.type === "file" ? file.file.url : "/images/default_thumbnail.png"
}
