import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

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
          <img className="w-auto h-7 relative object-contain block dark:hidden" src="https://mintlify.s3.us-west-1.amazonaws.com/maihem-29/logo/MAIHEM_Bittersweet_Full_Logo.svg" alt="light logo" />
          <img className="w-auto h-7 relative object-contain hidden dark:block" src="https://mintlify.s3.us-west-1.amazonaws.com/maihem-29/logo/MAIHEM_Bittersweet_Full_Logo.svg" alt="dark logo" />
          {/* Add Shadcn toggle for dark and light mode */}
        </header>
        <Main />
        <NextScript />
      </body>
    </Html >
  );
}
