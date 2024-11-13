import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";
import crypto from 'crypto';

export type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  authenticate: (token: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [username, setUserName] = React.useState<string | null>(null);
    const [token, setToken] = React.useState<string | null>(null);

    const router = useRouter();
    
    const login = () => {
        const state = crypto.randomBytes(16).toString('hex');
        const redirect_uri = `http://localhost:80/auth/callback`;
        const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
        const scope = "read";
        const url = `/api/oauth/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
        router.push(url);
    }
    
    const logout = ()=>{
        setToken(null);
        setIsAuthenticated(false);
        setUserName(null);
        localStorage.removeItem('access_token');
    }

    const authenticate = (token: string) => {
        if(!token) return false;
        localStorage.setItem('access_token', token);
        setToken(token);
        setIsAuthenticated(true);
        setUserName("usertest"); // TODO: get username from token
        return true;
    }

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        if(token){
            authenticate(token);
        }
    }, [])
    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, username, token, authenticate}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };