import type { Metadata, Viewport } from "next"
import { ReactNode } from "react"
import "./globals.css"

import { Footer, Header } from "@/app/_components/navigation"
import { Provider as ThemeProvider } from "@/app/_themes"

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
    card: "summary",
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

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
        <ThemeProvider>
          <Header />
          <main className="mx-auto mt-8 w-full max-w-4xl flex-1 px-6 sm:mt-14">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
