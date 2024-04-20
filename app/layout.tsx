import Footer from "@/app/_components/navigation/footer"
import Header from "@/app/_components/navigation/header"
import type { Metadata } from "next"
import { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Create Next App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="bg-blueGray">
        <Header />
        <main className="mx-auto min-h-[73vh] max-w-4xl px-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
