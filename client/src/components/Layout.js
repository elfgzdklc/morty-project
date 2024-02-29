
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (

        <main>
            <Navbar />
            <div className="p-4">
                {children}
            </div>
        </main>

    );
};

export default Layout;
