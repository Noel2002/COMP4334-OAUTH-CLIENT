import React, { createContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [username, setUserName] = React.useState<string | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    
    const login = () => {

    }
    
    const logout = ()=>{
    
    }
    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };