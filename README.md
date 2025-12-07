# Takumines Blog

## Tech Stack
- React v19.2.1
- Next.js v16.0.7
- TypeScript v5
- Tailwind CSS v3.4.3
- @notionhq/client v2.2.15
- react-markdown v9.0.1

## Getting Started
### Setup Notion
1. Create a new Notion Database
2. Get the Database ID and your Notion API Key  
  [Create integrations with the Notion API – Notion Help Center](https://help.notion.so/en/articles/694463777069278)

### Setup Next.js
1. create `.env.local` file
2. Add your Notion API Key and Database ID to `.env.local`
```
NOTION_SECRET_TOKEN=
NOTION_DATABASE_ID=
```
3. Install dependencies
```bash
$ yarn
```
4. Start the development server
```bash
$ yarn dev
```
