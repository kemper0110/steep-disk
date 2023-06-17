import React, {useEffect} from 'react';
import Header from "./features/header/Header";
import Main from "./features/main/Main";
import Aside from "./features/aside/Aside";
import {Dropzone} from "./features/dropzone/Dropzone";
import ContextMenu from "./features/contextMenu/ContextMenu";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store";
import {open, close} from './store/ContextMenuSlice';
import ActionBar from "./features/actionBar/ActionBar";
import {actionClose} from "./store/ActionSlice";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const onContextMenu = (e: MouseEvent) => {
            e.preventDefault()
            console.log("context click")
            if (e.pageX || e.pageY)
                dispatch(open({posx: e.pageX, posy: e.pageY}))
            else
                dispatch(open({
                    posx: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                    posy: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
                }))
        }
        const onClick = (e: MouseEvent) => {
            // console.log("click app")
            dispatch(close())
            dispatch(actionClose())
        }
        document.addEventListener('contextmenu', onContextMenu)
        document.addEventListener('click', onClick)
        return () => {
            document.removeEventListener('contextmenu', onContextMenu)
            document.removeEventListener('click', onClick)
        }
    }, [])
    return (
        <>
            <ActionBar/>
            <Dropzone/>
            <div className='bg-outbg p-8'>
                <Header/>
                <div className='flex min-h-screen'>
                    <Aside/>
                    <Main/>
                </div>
            </div>
            <ContextMenu/>
        </>
    );
}

export default App;
