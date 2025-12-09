import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Jonathan Cui",
  description:
    "I am a fourth-year student of Computer Science at UC San Diego, minoring in Mathematics.",
};

export const viewport: Viewport = { themeColor: "bg-gray-100" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link href="https://jonathancui.com/" rel="canonical" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        {/* tt-commons */}
        <link href="https://use.typekit.net/sob2svi.css" rel="stylesheet" />

        {/* katex */}
        <link
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          rel="stylesheet"
        />

        <title>Jonathan Cui</title>
      </head>
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
