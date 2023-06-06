import React from 'react';
import folderIcon from "../../ui/folder.svg";
import ObjectWrapper from "./ObjectWrapper";
import {folder_t, resolve} from "../../store/EntrySlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";

const Folder = ({folder}: { folder: folder_t }) => {
    const dispatch = useDispatch<AppDispatch>();
    const onDoubleClick = () => {
        // console.log(`open folder ${folder.name}, load inner entries`)
        dispatch(resolve(folder.name))
    }
    return (
        <ObjectWrapper onDoubleClick={onDoubleClick}>
            <img className='w-[80px] h-[80px]' src={folderIcon} alt=''/>
            <span className='text-sm'>{folder.name}</span>
        </ObjectWrapper>
    )
}
export default Folder;