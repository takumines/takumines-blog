import { Client } from "@notionhq/client"

const notionClient = new Client({
  auth: process.env.NOTION_SECRET_TOKEN || "dummy",
})

export default notionClient
