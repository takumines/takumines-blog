import { TagIcon } from "@/app/_components/elements/icon/tag-icon"
import { UpdatedAtIcon } from "@/app/_components/elements/icon/updated-at-icon"
import { Article } from "@/app/_features/article/types/type"
import Image from "next/image"
import Link from "next/link"

const ArticleSummaryCard = ({ article }: { article: Article }) => {
  const { date, slug, tags, title } = article

  return (
    <Link href={`/articles/${slug}`}>
      <article
        className="transform-gpu rounded-xl bg-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] duration-200 hover:translate-y-[-5px]
        hover:scale-[1.02] hover:transform-gpu hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] dark:bg-zinc-800
        dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] dark:hover:drop-shadow-[0_10px_10px_rgba(255,255,255,0.6)]"
      >
        <Image
          alt="サムネイル画像"
          className="rounded-t-xl"
          height={232}
          src={article.thumbnail}
          style={{
            height: "auto",
            width: "100%",
          }}
          width={406}
        />
        <div className="p-4 text-zinc-800 sm:p-6">
          <h2 className="line-clamp-2 justify-center break-all text-xl font-bold text-zinc-800 dark:text-zinc-50 sm:text-2xl">
            {title}
          </h2>
          <div className="mt-2 flex">
            {tags.map((tag) => (
              <div className="mr-3 flex items-center" key={tag}>
                <TagIcon
                  className="text-green-400 drop-shadow-[0_0px_4px_rgba(0,0,0,0.2)]"
                  height={16}
                  width={16}
                />
                <p className="ml-1 text-base text-green-400 drop-shadow-[0_0px_4px_rgba(0,0,0,0.2)]">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <UpdatedAtIcon className="text-zinc-400" height={20} width={20} />
            <p className="ml-1 text-base text-zinc-400">{date}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ArticleSummaryCard
