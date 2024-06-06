import { LinkButton } from "@/app/_components/elements/button"

const NotFound = () => {
  return (
    <div className="mx-auto mt-[200px] text-center">
      <h2 className="text-[32px] leading-[1.1] text-zinc-800 dark:text-zinc-50 sm:text-[44px]">
        404
      </h2>
      <h1 className="text-[56px] leading-[1.1] text-zinc-800 dark:text-zinc-50 sm:text-[88px]">
        Not Found
      </h1>
      <p className="my-8 text-base text-zinc-800 dark:text-zinc-50">
        お探しのページが見つかりませんでした
      </p>
      <LinkButton href="/" textSize="base" variant="primary">
        TOPへ戻る
      </LinkButton>
    </div>
  )
}

export default NotFound
