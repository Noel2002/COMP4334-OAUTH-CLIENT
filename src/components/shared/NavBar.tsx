import { AuthContext } from '@/context/AuthContext';
import React from 'react';
import { Button } from '../ui/button';

const NavBar = () => {
  const context = React.useContext(AuthContext);
  return (
    <nav className=' flex justify-between py-4 items-center'>
        <div>BLOG.</div>
        <>
            {
                !context?.isAuthenticated ? 
                <Button onClick={context?.login} className=' rounded-md'>Sign in</Button> :
                <button onClick={context.logout}>Logout</button>

            }
        </>
    </nav>

  )
}

export default NavBar