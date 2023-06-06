import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {stepUp} from "../../store/EntrySlice";
import arrowBack from '../../ui/arrow-back.svg';

const StateBar = () => {
    const path = useSelector((state: RootState) => state.entries.path === "" ? "Файлы" : state.entries.path)
    const dispatch = useDispatch<AppDispatch>()
    const onClick = () => dispatch(stepUp());
    return (
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <button className='shadow rounded-lg' onClick={onClick}>
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