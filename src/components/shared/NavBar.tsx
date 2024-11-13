import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const NavBar = () => {
    const context = React.useContext(AuthContext);
    const handleLogin = () => {

    }
    const handleLogout = ()=>{

    }
  return (
    <nav className=' flex justify-between py-4 items-center'>
        <div>BLOG.</div>
        <>
            {
                !context?.isAuthenticated ? 
                <Button onClick={handleLogin} className=' rounded-md'>Login</Button> :
                <button onClick={handleLogin}>Logout</button>

            }
        </>
    </nav>

  )
}

export default NavBar