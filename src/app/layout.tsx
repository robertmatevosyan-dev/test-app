"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <html lang="en">
      <body>
        {!isMainPage && (
            <p>
              <Link href="/">← Back to the Main page</Link>
            </p>
        )}
        {children}
      </body>
    </html>
  )
}
