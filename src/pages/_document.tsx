import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="favicon.svg" />
          <title>Hambúrgeria do João</title>
        </Head>
  
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }