import TagIcon from "@/app/_components/elements/icon/tag-icon"
import UpdatedAtIcon from "@/app/_components/elements/icon/updated-at-icon"
import Image from "next/image"
import Link from "next/link"

const ArticleSummaryCard = () => {
  return (
    <div className="hover:scal-y-[1.02] rounded-xl bg-skyBlue drop-shadow-[0_0px_10px_rgba(0,0,0,0.6)] hover:translate-y-[-5px]">
      <Image
        alt="gazou"
        className="rounded-t-xl"
        height={232}
        src="/images/default_thumbnail.png"
        width={406}
      />
      <div className="bg-gray-100 p-6 text-black">
        <Link href="/articles/3">
          <h2 className="justify-center break-all text-[24px] font-bold">
            これはサンプル記事タイトルです
          </h2>
        </Link>
        <div className="mt-2">
          <div className="flex items-center">
            <TagIcon
              className="text-[#ADFF2F]/[.6] drop-shadow-[0_0px_4px_rgba(0,0,0,0.5)]"
              height={16}
              width={16}
            />
            <p className="ml-1 text-[16px] text-[#ADFF2F]/[.6] drop-shadow-[0_0px_4px_rgba(0,0,0,0.5)]">
              Development
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <UpdatedAtIcon className="text-black/[.7]" height={20} width={20} />
          <p className="ml-1 text-[16px] text-black/[.7]">2024-04-01</p>
        </div>
      </div>
    </div>
  )
}

export default ArticleSummaryCard
