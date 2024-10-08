import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"

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
 * PageObjectResponseのプロパティの型からURLの型を抽出する
 */
export type URL = ExtractPropertyType<
  PageObjectResponse["properties"][keyof PageObjectResponse["properties"]],
  "url"
>

/**
 * DatabaseObjectResponseのプロパティの型からMultiSelectの型を抽出する
 */
export type MultiSelectForDatabaseProperty = ExtractPropertyType<
  DatabaseObjectResponse["properties"][keyof DatabaseObjectResponse["properties"]],
  "multi_select"
>

export type Tag = {
  description: string
  name: string
}

export type Article = {
  date: string
  id: string
  slug: string
  tags: string[]
  thumbnailUrl: string
  title: string
}

export type ArticleDetail = Article & {
  content: string
}
