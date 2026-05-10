import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FolloNett',
  description: 'Luxury streetwear store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}