import { ThemeSwitch } from "@/app/_themes/components"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full bg-zinc-50/[95%] dark:bg-zinc-900/[95%]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-14 items-center justify-between leading-[54px]">
          <Link
            className="inline-block translate-x-0 text-[24px] text-black"
            href="/"
          >
            <div className="flex translate-x-0 items-center drop-shadow-[0_0px_6px_rgba(0,0,0,1.0)] dark:drop-shadow-[0_0px_10px_rgba(255,255,255,0.7)]">
              <Image
                alt="takumines blog logo"
                className="mx-2 rounded-full"
                height={28}
                src="/images/logo.png"
                width={28}
              />
              <p className="text-zinc-800 drop-shadow-[0_0px_10px_rgba(0,0,0,0.3)] dark:text-zinc-50 dark:drop-shadow-[0_0px_10px_rgba(255,255,255,0.7)]">
                takumines blog
              </p>
            </div>
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
