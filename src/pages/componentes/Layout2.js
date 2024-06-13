import Link from "next/link";
import Head from "next/head";
import { Children, useState } from "react";
import { useAuth } from "../contexto/AuthContext"; // Importa el contexto de autenticación
export default function Layout({ children }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { logout } = useAuth(); 
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    return (
        <>
            <Head>
                <title>Kokua</title>
            </Head>
            <div className="container">
                <nav id="nav1">
                    <Link href="/">
                        <img src="/imagenkokua.png" alt="" className="kokua" />
                    </Link>
                    <div className="nav-links">
                        <Link href="/VoluntariadoCercano" >Postular</Link>
                    </div>
                    <li className="registrar-button" >
                        <span className="span1" onClick={handleLogout}>Cerrar sesión</span>
                    </li>
                </nav>
                <main>
                    {children}
                </main>
            </div>
            <footer>
                <div className="Footerfeo">

                    <div className="footer-contenido">

                        <div className="footer-primeracolumna">
                            <div className="footerconimagen">
                                <img src="/imagenkokua.png" alt="" className="kokua2" />
                            </div>
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
                <div className="footercopy">
                    <p> © Copyright (©) 2023 KOKUA. Todos los derechos reservados.</p></div>
            </footer>

        </>
    );
}