import { getArticleList } from "@/app/_features/article/api"
import RSS from "rss"

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_BASE_URL ?? ""

  const baseRss = new RSS({
    copyright: "takumines",
    description: "Personal blog by takumines",
    feed_url: `${URL}/rss`,
    language: "ja",
    pubDate: new Date().toISOString(),
    site_url: `${URL}`,
    title: "takumines blog",
  })

  // 各記事の情報を取得
  const response = await getArticleList()
  if (response instanceof Error) {
    return new Response(baseRss.xml({ indent: true }), {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    })
  }

  response.forEach((article) => {
    baseRss.item({
      date: article.date,
      description: `${article.title} | takumines blog`,
      title: article.title,
      url: `${URL}/articles/${article.slug}`,
    })
  })

  return new Response(baseRss.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  })
}
