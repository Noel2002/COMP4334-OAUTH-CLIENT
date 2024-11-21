import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";
import * as crypto from 'crypto';

function dec2hex(dec: any) {
    return ("0" + dec.toString(16)).substr(-2);
}
  
function generateCodeVerifier() {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
}
function sha256(plain: string) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }
  
function base64urlencode(a: any) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(v: any) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  authenticate: (code: string, state: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
}
const AuthProvider = (props: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [username, setUserName] = React.useState<string | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [idToken, setIdToken] = React.useState<string | null>(null);

    const router = useRouter();
    
    const login = async () => {
        const state = crypto.randomBytes(16).toString('hex');
        const code_verifier = generateCodeVerifier();
        const code_challenge = await generateCodeChallengeFromVerifier(code_verifier);
        console.log({code_challenge, code_verifier});
        
        const redirect_uri = `http://localhost:80/auth/callback`;
        const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
        const scope = "profile";
        const response_type = "code";
        const url = `/api/oauth/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&code_challenge=${code_challenge}&code_challenge_method=S256`;
        sessionStorage.setItem("oauth_state", state);
        sessionStorage.setItem("code_verifier", code_verifier);

        router.push(url);
    }
    
    const logout = ()=>{
        setToken(null);
        setIdToken(null);
        setIsAuthenticated(false);
        setUserName(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
    }

    const authenticate = async(code: string, state: string) => {
        const savedState = sessionStorage.getItem('oauth_state');
        // if(savedState !== state){
        //     return false;
        // }

        const code_verifier = sessionStorage.getItem('code_verifier');
        const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;

        const body = {
            grant_type: 'authorization_code',
            code,
            client_id,
            redirect_uri: `http://localhost:80/auth/callback`,
            code_verifier,
            client_secret: "a920874398aa35dd77dc09679d6e096d"
        };

        console.log({body});
        
        const response = await fetch('/api/oauth/token', {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        const token = data.access_token;
        const idToken = data.id_token;
        console.log({data});
        if(!token) return false;

        localStorage.setItem('access_token', token);
        localStorage.setItem('id_token', idToken);
        sessionStorage.removeItem('oauth_state');
        sessionStorage.removeItem('code_verifier');

        setToken(token);
        setIdToken(idToken);
        setIsAuthenticated(true);
        setUserName("usertest"); // TODO: get username from token
        return true;
    }


    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        if(token){
            setToken(token);
        }
    }, [])
    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, username, token, authenticate}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };