import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full bg-zinc-50/[95%]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-14 leading-[54px]">
          <Link
            className="inline-block text-[24px] text-black drop-shadow-[0_0px_8px_rgba(0,0,0,0.9)]"
            href="/"
          >
            <div className="flex items-center">
              <Image
                alt="takumines blog logo"
                className="mr-2 rounded-full"
                height={28}
                src="/images/logo.png"
                width={28}
              />
              takumines blog
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
