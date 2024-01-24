import React from 'react';
import _Navbar from '../components/_Navbar';
import _Footer from '../components/_Footer';

const MainLayout = ({children}) => {
    return (
        <>
            <_Navbar />
            <main>
                {children}
            </main>
            <_Footer />
        </>
    )
}

export default MainLayout