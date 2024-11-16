import { getArticleList } from "@/app/_features/article/api"
import { NotionApiError } from "@/app/_features/article/error"
import { MetadataRoute } from "next"

const URL = process.env.NEXT_PUBLIC_BASE_URL ?? ""
const lastModified = new Date().toISOString()
const BASE_SITEMAP = [
  {
    lastModified,
    url: `${URL}`,
  },
]

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const response = await getArticleList()

  if (response instanceof NotionApiError) {
    return BASE_SITEMAP
  }

  const articleSitemap = response.map((article) => ({
    lastModified: article.date,
    url: `${URL}/articles/${article.slug}`,
  }))

  return [...BASE_SITEMAP, ...articleSitemap]
}

export default Sitemap
