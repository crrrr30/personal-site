import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Jonathan Cui",
  description:
    "I am a third-year student of Computer Science at UC San Diego, minoring in Mathematics.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
        <link rel="canonical" href="https://jonathancui.com/" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* serif */}
        <link
          rel="preload"
          href="https://use.typekit.net/jbi5acz.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/jbi5acz.css" />

        {/* sans serif */}
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        {/* mono */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com/" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.min.css"
        />

        {/* katex */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          crossOrigin="anonymous"
        />

        <title>Jonathan Cui</title>
      </head>
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>

    // <html suppressHydrationWarning lang="en">
    //   <head />
    //   <body
    //     className={clsx(
    //       "min-h-screen text-foreground bg-background sans antialiased",
    //       fontSans.variable
    //     )}
    //   >
    //     <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
    //       <div className="relative flex flex-col h-screen">
    //         {/* <Navbar /> */}
    //         <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
    //           {children}
    //         </main>
    //         <footer className="w-full flex items-center justify-center py-3">
    //           <Link
    //             isExternal
    //             className="flex items-center gap-1 text-current"
    //             href="https://heroui.com?utm_source=next-app-template"
    //             title="heroui.com homepage"
    //           >
    //             <span className="text-default-600">Powered by</span>
    //             <p className="text-primary">HeroUI</p>
    //           </Link>
    //         </footer>
    //       </div>
    //     </Providers>
    //   </body>
    // </html>
  );
}
