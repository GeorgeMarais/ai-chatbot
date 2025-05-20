import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased h-full max-w-[2000px]">
        <header className="flex justify-left items-center py-5 px-12">
          <h1 className="w-auto h-7 relative object-contain block text-[#ff8b7c] text-2xl font-bold">
            AI 9000
          </h1>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
