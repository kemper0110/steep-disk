import React from 'react';
import StateBar from "./StateBar";
import {FileSpace} from "./FileSpace";
const Main = () => {
    // TODO: main fixed sizes
    return (
        <main className='w-[1486px] h-[868px] bg-white rounded-r-2xl p-4 flex flex-col  gap-4'>
            <StateBar/>
            <FileSpace/>
        </main>
    );
};

export default Main;