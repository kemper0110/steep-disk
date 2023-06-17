import React from 'react';
import fileIcon from "../../ui/file.svg";
import ObjectWrapper from "./ObjectWrapper";
import {entry_t, file_t} from "../../store/EntrySlice";
import {fileRef} from "../api/api";
import {actionOpen} from "../../store/ActionSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {drag} from "../../store/DragSlice";

const img = new Image()
img.src = fileIcon
const File = ({file}: { file: file_t }) => {
    const selected = useSelector((state: RootState) => state.action.entry?.path === file.path)
    const dispatch = useDispatch()
    const onDoubleClick = () => {
        const link = document.createElement('a')
        const ref = fileRef(file.path)
        console.log(ref)
        link.href = ref
        link.target = '_blank'
        link.click()
    }
    const onClick = () => {
        console.log('click file')
        dispatch(actionOpen(file))
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move';
    };
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setDragImage(img, 80, 80)
        e.dataTransfer.setData('application/json', JSON.stringify(file))
        e.dataTransfer.effectAllowed = 'move'
    };
    return (
        <ObjectWrapper
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDoubleClick={onDoubleClick} onClick={onClick} className={`${selected ? "brightness-95" : ""}`}>
            <img className='w-[80px] h-[80px]' src={fileIcon} alt=''/>
            <span className='text-sm overflow-ellipsis w-[120px] line-clamp-2'>{file.name}</span>
        </ObjectWrapper>
    )
}

export default File;