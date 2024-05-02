import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

type ExtractPropertyType<T, K extends string> =
  T extends Record<K, infer U> ? U : never

/**
 * PageObjectResponseのプロパティの型からMultiSelectの型を抽出する
 */
export type MultiSelect = ExtractPropertyType<
  PageObjectResponse["properties"][keyof PageObjectResponse["properties"]],
  "multi_select"
>

/**
 * PageObjectResponseのプロパティの型からFilesの型を抽出する
 */
export type Files = ExtractPropertyType<
  PageObjectResponse["properties"][keyof PageObjectResponse["properties"]],
  "files"
>

export type Article = {
  date: string
  id: string
  slug: string
  tags: string[]
  thumbnail: string
  title: string
}

export type ArticleDetail = Article & {
  content: string
}
