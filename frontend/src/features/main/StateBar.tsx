import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {entry_t, stepUp} from "../../store/EntrySlice";
import arrowBack from '../../ui/arrow-back.svg';
import {useMutation, useQueryClient} from "react-query";
import {move} from "../api/api";

const StateBar = () => {
    const path = useSelector((state: RootState) => state.entries.path === "" ? "Файлы" : state.entries.path)
    const dispatch = useDispatch<AppDispatch>()
    const queryClient = useQueryClient()
    const renameMutation = useMutation(({path, newpath}: {path: string, newpath: string}) => move(path, newpath), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries']})
    })
    const onClick = () => dispatch(stepUp());

    const onDrop = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(path === "") return
        const src: entry_t = JSON.parse(e.dataTransfer.getData('application/json'))
        const slashPos = path.lastIndexOf('/')
        const newpath = (slashPos === -1 ? "" : path.substring(0, slashPos + 1)) + src.name
        // console.log("from " + src.path + " to " + newpath)
        renameMutation.mutate({path: src.path, newpath})
    };
    const onDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move';
    };
    return (
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <button className='shadow rounded-lg'
                        onClick={onClick} onDrop={onDrop}
                        onDragOver={onDragOver}
                >
                    <img src={arrowBack} alt='back'/>
                </button>
                <h2 className='font-medium text-2xl'>{path}</h2>
            </div>
            <div className='flex gap-2 items-center'>
                <span className='p-2 rounded shadow'>Ж По названию</span>
                <span className='p-2 rounded shadow'>ЖЖ</span>
            </div>
        </div>
    );
};

export default StateBar;