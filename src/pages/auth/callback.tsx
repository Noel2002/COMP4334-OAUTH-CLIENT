import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Callback = () => {
    const [fragment, setFragment] = React.useState('');
    const router = useRouter();
    const context = React.useContext(AuthContext);
    useEffect(() => {
        console.log({hash: window.location.hash});
        
        setFragment(window.location.hash.substring(1));
    }, []);

    if (!fragment) {
        return <></>;
    }
    console.log({fragment});
    
    const params = new URLSearchParams(fragment);
    const token = params.get('access_token');
    if(token){
      const isAuthenticated = context?.authenticate(token);
      if(isAuthenticated){
        router.push('/');
      }
    }
    
    
  return (
    <div>Redirecting to content . . .</div>
  )
}

export default Callback