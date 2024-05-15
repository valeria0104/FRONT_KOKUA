import './styles/all.css'
import './styles/header.css'
import './styles/layout.css'
import './styles/registrar.css'
import './styles/PaginaPrincipal.css'
import './styles/IniciarSesion.css'
import './styles/nosotros.css'
import { AppProps } from 'next/app'

export default function MyApp({Component, pageProps }){
    return <Component {...pageProps} />
}/// esto es para hacer el estilo global 
