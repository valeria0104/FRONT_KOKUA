import './styles/all.css'
import './styles/header.css'
import './styles/layout.css'

import { AppProps } from 'next/app'

export default function MyApp({Component, pageProps }){
    return <Component {...pageProps} />
}/// esto es para hacer el estilo global 
