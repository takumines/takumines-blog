import Footer from "@/app/_components/navigation/footer"
import Header from "@/app/_components/navigation/header"
import type { Metadata, Viewport } from "next"
import { ReactNode } from "react"
import "./globals.css"

const META_TITLE = "takumines blog"
const META_DESCRIPTION = "Personal blog by takumines"

export const metadata: Metadata = {
  creator: "takumi kurogi",
  description: META_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
  openGraph: {
    description: META_DESCRIPTION,
    images: "/images/ogp.png",
    title: META_TITLE,
  },
  referrer: "origin-when-cross-origin",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
    index: true,
  },
  title: META_TITLE,
  twitter: {
    card: "summary_large_image",
    description: META_DESCRIPTION,
    images: "/images/ogp.png",
    site: META_TITLE,
    title: META_TITLE,
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="flex h-screen flex-col bg-gray">
        <Header />
        <main className="mx-auto w-full max-w-4xl flex-1 px-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
