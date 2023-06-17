import React from 'react';
import folderIcon from "../../ui/folder.svg";
import ObjectWrapper from "./ObjectWrapper";
import {entry_t, folder_t, resolve} from "../../store/EntrySlice";
import {actionOpen} from "../../store/ActionSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {drag} from "../../store/DragSlice";
import {useMutation, useQueryClient} from "react-query";
import {makeFolder, move} from "../api/api";

const img = new Image()
img.src = folderIcon
const Folder = ({folder}: { folder: folder_t }) => {
    const dispatch = useDispatch<AppDispatch>();
    const queryClient = useQueryClient()
    const moveFolderMutation = useMutation((s: { path: string, newpath: string }) => move(s.path, s.newpath), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries']})
    })
    const onDoubleClick = () => {
        dispatch(resolve(folder.name))
    }
    const onClick = () => {
        console.log('click folder')
        dispatch(actionOpen(folder))
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const dst = folder
        const src: entry_t = JSON.parse(e.dataTransfer.getData('application/json'))
        if(src.path === dst.path)
            return
        const path = src.path
        const newpath = dst.path + '/' + src.name
        console.log("from " + path + " to " + newpath)
        moveFolderMutation.mutate({path, newpath})
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move';
    };
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setDragImage(img, 80, 80)
        e.dataTransfer.setData('application/json', JSON.stringify(folder))
        e.dataTransfer.effectAllowed = 'move'
    };
    return (
        <ObjectWrapper
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDoubleClick={onDoubleClick} onClick={onClick}>
            <img className='w-[80px] h-[80px]' src={folderIcon} alt=''/>
            <span className='text-sm'>{folder.name}</span>
        </ObjectWrapper>
    )
}
export default Folder;