import React from 'react';
import Header from "./features/header/Header";
import Main from "./features/main/Main";
import Aside from "./features/aside/Aside";

function App() {
    //
    return (
        <div className='bg-outbg w-full h-screen'>
            <Header/>
            <div className='flex m-5'>
                <Aside/>
                <Main/>
            </div>
        </div>
    );
}

export default App;
