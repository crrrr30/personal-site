import "@/styles/globals.css";

import type { Metadata } from "next";

import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Jonathan Cui",
  description:
    "I am a fourth-year student at UC San Diego, double majoring in Computer Science (CS26) and Mathematics (MA29) with a 3.97 GPA.",
};

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
        {/* <link
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          rel="stylesheet"
        /> */}

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
