import TagIcon from "@/app/_components/elements/icon/tag-icon"
import UpdatedAtIcon from "@/app/_components/elements/icon/updated-at-icon"
import { Article } from "@/app/_features/article/types/type"
import Image from "next/image"
import Link from "next/link"

const ArticleSummaryCard = ({ article }: { article: Article }) => {
  const { date, slug, tags, title } = article

  return (
    <Link href={`/articles/${slug}`}>
      <div className="hover:scal-y-[1.02] rounded-xl bg-skyBlue drop-shadow-[0_0px_10px_rgba(0,0,0,0.6)] duration-200 hover:translate-y-[-5px]">
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
        <div className="p-6 text-black">
          <h2 className="justify-center break-all text-[24px] font-bold">
            {title}
          </h2>
          <div className="mt-2 flex">
            {tags.map((tag) => (
              <div className="mr-3 flex items-center" key={tag}>
                <TagIcon
                  className="text-limeGreen/[.6] drop-shadow-[0_0px_4px_rgba(0,0,0,0.5)]"
                  height={16}
                  width={16}
                />
                <p className="ml-1 text-[16px] text-limeGreen/[.6] drop-shadow-[0_0px_4px_rgba(0,0,0,0.5)]">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <UpdatedAtIcon className="text-black/[.7]" height={20} width={20} />
            <p className="ml-1 text-[16px] text-black/[.7]">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleSummaryCard
