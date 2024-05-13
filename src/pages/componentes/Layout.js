import Link from "next/link";
import Head from "next/head";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Kokua</title>
            </Head>
            <div className="container">
                <nav id="nav1">
                    <Link href="/pantalla1">
                        <img src="imagenkokua.png" alt="" className="kokua" />
                    </Link>
                    <div className="nav-links">
                        <Link href="/Nosotros" >Nosotros</Link>
                        <div className="Espaciado"></div>
                        <Link href="/IniciarSesion">Iniciar sesión</Link>
                    </div>
                    <div className="Layout-button">
                        <Link href="/Registrar">Registrarse</Link>
                    </div>
                </nav>
            </div>
            <main>
                {children}
            </main>
            <footer>
                <div className="Footerfeo">
                    <div className="footer-contenido">
                        <div className="footer-primeracolumna">
                            <div className="footerconimagen">
                                <img src="imagenkokua.png" alt="" className="kokua2" />
                            </div>
                            <p>Email: voluntarioskokua@gmail.com</p>
                            <p>Teléfono: 914-123-456</p>
                            <p>Facebook: KOKUA PERU</p>
                            <p>Instagram: KOKUA PERU</p>
                        </div>
                        <div className="footer-segundacolumna">
                            <p>Menú principal</p>
                            <a href="/Nosotros">Nosotros</a>
                            <a href="/Organizaciones">Organizaciones</a>
                        </div>
                        <div className="footer-segundacolumna">
                            <p>UWU</p>
                            <a href="/Preguntas">Preguntas frecuentas</a>
                            <a href="/Terminos">Terminos y condiciones</a>
                            <a href="/Politicas">Politicas de privacidad</a>
                        </div>
                        <div className="footer-segundacolumna">
                            <p>ENCUENTRANOS EN </p>
                            <a href="/Instagram">Instagram</a>
                            <a href="/Facebook">Facebook</a>
                            <a href="/Twiter">Twiter</a>
                        </div>
                    </div>
                </div>
                <div className="footercopy">
                    <p> © Copyright (©) 2023 KOKUA. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
}
