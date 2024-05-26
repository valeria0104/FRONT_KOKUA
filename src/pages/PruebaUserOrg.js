import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
function App() {
    
    

    return (
        <>
            <Layout>
                <p>Hola organizacion</p>
            </Layout>
        </>
    );
}

export default App;
