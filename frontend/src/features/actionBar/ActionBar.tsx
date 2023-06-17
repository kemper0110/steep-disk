import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {RenameAction} from "./RenameAction";
import {DeleteAction} from "./DeleteAction";
import {entry_t} from "../../store/EntrySlice";
import {fileRef} from "../api/api";

const Actions = ({entry}: { entry: entry_t }) => {
    const onDownload = () => {
        const link = document.createElement('a')
        const ref = fileRef(entry.path)
        console.log(ref)
        link.href = ref
        link.target = '_blank'
        link.click()
    }
    return (
        <div className='flex items-center gap-4 grow' onClick={e => e.stopPropagation()}>
            <button className='text-white bg-gray-500 py-2 px-3 rounded-lg'>Поделиться</button>
            {
                entry.type === "file" ?
                    <button onClick={onDownload}
                            className='text-white bg-gray-500 py-2 px-3 rounded-lg'>Скачать</button>
                    : null
            }
            <div className='flex grow justify-end'>
                <DeleteAction entry={entry}/>
                <RenameAction entry={entry}/>
            </div>
        </div>
    )
}
const Title = () => {
    return (
        <div className='flex w-[240px] text-white'>
            <div className='px-3 py-1'>i</div>
            <span className='px-3 py-1'>Новая папка</span>
        </div>
    )
}
const Close = () => {
    return (
        <span className='text-white p-3'>X</span>
    )
}

const ActionBar = () => {
    const {entry} = useSelector((state: RootState) => state.action)
    if (entry === null)
        return <></>
    return (
        <div
            // style={{visibility: entry ? "visible" : "hidden"}}
            className='fixed top-0 left-0 w-full px-8'>
            <div className='flex items-center bg-black/90 rounded-b-xl px-5 py-3 '>
                <div className='flex items-center grow'>
                    <Title/>
                    <Actions entry={entry!}/>
                </div>
                <Close/>
            </div>
        </div>
    );
};
export default ActionBar;