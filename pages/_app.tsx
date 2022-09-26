import GlobalStyle from '../styles/Global'
import '../styles/globals.sass'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fontsource/montserrat'
config.autoAddCss = false

function MyApp(props: AppProps) {
  return (
    <>
      <GlobalStyle />
      <App {...props}/>
    </>
  )
}

function App({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
