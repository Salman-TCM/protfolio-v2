import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono, Press_Start_2P, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import SocialLinks from "@/components/social-links"
import RetroCursor from "@/components/retro-cursor"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
})

const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Md. Salman Hossain — Software Engineer (AI & NLP)",
  description: "Md. Salman Hossain — Software Engineer specializing in AI/NLP, web scraping, and full-stack systems.",
  generator: "Md. Salman Hossain",
  // icons: {
  //   icon: [
  //     {
  //       url: "/icon-light-32x32.png",
  //       media: "(prefers-color-scheme: light)",
  //     },
  //     {
  //       url: "/icon-dark-32x32.png",
  //       media: "(prefers-color-scheme: dark)",
  //     },
  //     {
  //       url: "/icon.svg",
  //       type: "image/svg+xml",
  //     },
  //   ],
  //   apple: "/apple-icon.png",
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geistMono.className} ${pressStart2P.variable} ${ibmPlexMono.variable} font-mono antialiased bg-black text-white`}>
        <RetroCursor />
        {children}
        <SocialLinks />
        <Analytics />
      </body>
    </html>
  )
}
