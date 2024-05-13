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
                    <div className="register-button">
                        <Link href="/Registrar">Registrarse</Link>
                    </div>
                </nav>
                <main>
                    {children}
                </main>
            </div>
            <footer>
                <div className="Footerfeo">
                    <div className="footerconimagen">
                        <img src="imagenkokua.png" alt="" className="kokua2" />
                        <div className="footer-contenido">
                            <div className="footer-primeracolumna">
                                <p>Email: voluntarioskokua@gmail.com</p>
                                <p>Teléfono: 914-123-456</p>
                                <p>Facebook: KOKUA PERU</p>
                                <p>Instagram: KOKUA PERU</p>
                            </div>
                            <div className="footer-segundacolumna">
                                <p>Menú principal</p>
                                <Link href="/Nosotros">Nosotros</Link>
                                <Link href="/Organizaciones">Organizaciones</Link>
                            </div>
                            <div className="footer-segundacolumna">
                                <p>UWU</p>
                                <Link href="/Preguntas">Preguntas frecuentas</Link>
                                <Link href="/Terminos">Terminos y condiciones</Link>
                                <Link href="/Politicas">Politicas de privacidad</Link>
                            </div>
                            <div className="footer-segundacolumna">
                                <p>ENCUENTRANOS EN </p>
                                <Link href="/Instagram">Instagram</Link>
                                <Link href="/Facebook">Facebook</Link>
                                <Link href="/Twiter">Twiter</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footercopy">
                <p> © Copyright (©) 2023 KOKUA. Todos los derechos reservados.</p></div>
            </footer>

        </>
    );
}