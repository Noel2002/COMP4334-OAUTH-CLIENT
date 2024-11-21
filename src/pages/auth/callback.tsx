import { AuthContext } from '@/context/AuthContext';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Callback = () => {
    const context = React.useContext(AuthContext);
    const router = useRouter();
    const params = useSearchParams();
    const code = params.get('code');
    const state = params.get('state');
    if(code && state){
      const isAuthenticated = context?.authenticate(code, state);
      // if(isAuthenticated){
      //   router.push('/');
      // }
    }
    
    
  return (
    <div>Redirecting to content . . .</div>
  )
}

export default Callback