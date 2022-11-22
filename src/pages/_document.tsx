import * as React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const htmlStyle: React.CSSProperties = {
  colorScheme: 'dark'
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' data-theme='dark' style={htmlStyle}>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
