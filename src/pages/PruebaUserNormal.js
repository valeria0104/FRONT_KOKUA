import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { useAuth} from './contexto/AuthContext'; 
function App() {
    const { user } = useAuth();
    

    return (
        <>
            <Layout>
                <p>hola voluntario {user.correo} y soy {user.nombre}</p>
             <Link href="/RegistroPostulante">pioooooo</Link>
            </Layout>
        </>
    );
}

export default App;
