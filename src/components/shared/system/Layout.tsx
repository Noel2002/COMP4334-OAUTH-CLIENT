import React from 'react'
import NavBar from '../NavBar';

type LayoutProps = {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
  return (
    <div className=' max-w-7xl mx-auto'>
        <NavBar />
        <div>
            {children}
        </div>
    </div>
  )
}

export default Layout