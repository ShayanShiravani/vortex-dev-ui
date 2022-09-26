import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
class MyDocument extends Document {

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta name="description" content="Vortex" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous | use-credentials" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument