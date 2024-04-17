import Link from "next/link"

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-blue-gray">
      <div className="mx-auto max-w-4xl px-6">
        <div className="h-14 leading-[54px]">
          <Link
            className="text-[24px] text-black drop-shadow-[0_0px_10px_rgba(0,0,0,0.9)]"
            href="/"
          >
            takumines blog
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
