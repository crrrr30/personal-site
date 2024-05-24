import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jonathan Cui",
  description:
    "A Proud Penn-Stater. Although a second-year student at Penn State, I am in senior-level standing in terms of credit with a 4.0 GPA, whereby I have been awarded the President Walker Award.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Jonathan Cui</title>
        <link rel="canonical" href="https://jonathancui.com/" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preload"
          href="https://use.typekit.net/jbi5acz.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/jbi5acz.css" />
      </head>
      <body className="bg-dark text-base md:text-lg">{children}</body>
    </html>
  );
}
