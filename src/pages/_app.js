import './styles/all.css'
import './styles/Organizacion.css'
import './styles/header.css'
import './styles/layout.css'
import './styles/registrar.css'
import './styles/PaginaPrincipal.css'
import './styles/IniciarSesion.css'
import './styles/nosotros.css'
import './styles/registrarVoluntario.css'
import './styles/registrarVoluntario2.css'
import './styles/registroPostulante.css'
import './styles/Voluntariadocercano.css';
import { AuthProvider } from './contexto/AuthContext'; 
import { AppProps } from 'next/app'

export default function MyApp({Component, pageProps }){
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}/// esto es para hacer el estilo global 
