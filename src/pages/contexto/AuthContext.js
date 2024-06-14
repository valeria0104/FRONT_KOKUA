import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Verificar si hay datos de usuario en localStorage al cargar la página
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        // Guardar usuario en localStorage al iniciar sesión
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        console.log("Sesión cerrada");
        setUser(null);
        // Eliminar datos de usuario de localStorage al cerrar sesión
        localStorage.removeItem('user');
        router.push('/'); // Redirigir al usuario a la página de inicio de sesión u otra página al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};
