import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./ui/globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Open Web3 Hub",
  description: "Discover and explore open source Web3 projects",
  keywords: ['blockchain', 'web3', 'artificial intelligence', 'machine learning', 'nft'],
  authors: [{ name: 'Lenugo' }],
  openGraph: {
    title: "Open Web3 Hub",
    description: "Discover and explore open source Web3 projects",
    url: "https://openweb3hub.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://openweb3hub.vercel.app/",
        width: 1200,
        height: 630,
        alt: "Open Web3 Hub",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.classList.add(theme);
            })();
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
