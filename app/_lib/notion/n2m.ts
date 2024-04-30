import { notionClient } from "@/app/_lib/notion/client"
import { NotionToMarkdown } from "notion-to-md"

export const n2m = async (id: string) => {
  const n2m = new NotionToMarkdown({ notionClient })
  const blocks = await n2m.pageToMarkdown(id)
  const md = n2m.toMarkdownString(blocks).parent

  return md
}
