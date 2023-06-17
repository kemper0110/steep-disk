import React from 'react';
import StateBar from "./StateBar";
import {FileSpace} from "./FileSpace";
const Main = () => {
    // TODO: main fixed sizes
    return (
        <main className='w-full bg-white rounded-r-2xl p-4 flex flex-col  gap-4'>
            <StateBar/>
            <FileSpace/>
        </main>
    );
};

export default Main;