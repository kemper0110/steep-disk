import React from 'react';
import fileIcon from "../../ui/file.svg";
import ObjectWrapper from "./ObjectWrapper";
import {file_t} from "../../store/EntrySlice";

const File = ({file}: { file: file_t }) => {
    const onDoubleClick = () => {
        console.log("download file")
    }
    return (
        <ObjectWrapper onDoubleClick={onDoubleClick}>
            <img className='w-[80px] h-[80px]' src={fileIcon} alt=''/>
            <span className='text-sm'>{file.name}</span>
        </ObjectWrapper>
    )
}

export default File;