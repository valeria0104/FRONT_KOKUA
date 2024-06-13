import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Crear el contexto
const AuthContext = createContext();

// Proveedor de contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = (userData) => {
        setUser(userData);
        // Aquí podrías guardar el usuario en el almacenamiento local si quieres persistir la sesión
    };

    const logout = () => {
        console.log("sesión cerrada");
        setUser(null);
        
        router.push('/'); // Redirigir al usuario a la página de inicio de sesión u otra página al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
