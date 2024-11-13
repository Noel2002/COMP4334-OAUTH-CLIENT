import React, { useEffect } from 'react'

const Callback = () => {
    const [fragment, setFragment] = React.useState('');
    useEffect(() => {
        console.log({hash: window.location.hash});
        
        setFragment(window.location.hash.substring(1));
    }, []);

    if (!fragment) {
        return <></>;
    }
    console.log({fragment});
    
    const params = new URLSearchParams(fragment);
    console.log(params.get('access_token'));
    
    
  return (
    <div>{params.get('access_token')}</div>
  )
}

export default Callback