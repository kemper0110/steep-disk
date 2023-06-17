import React, {useEffect, useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface ItemProps {
    title: string
    onClick?: () => void;
}

const Item = ({title, onClick}: ItemProps) => {
    return (
        <li className='px-4 text-left py-2'>
            {title}
        </li>
    )
}

const ContextMenu = () => {
    const {posx, posy, opened} = useSelector((state: RootState) => state.contextMenu)
    const dialog = React.useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (!dialog.current) return
        opened ? dialog.current.show() : dialog.current.close()
    }, [opened])
    return (
        <dialog ref={dialog}
                style={{top: posy, left: posx}}
                className='absolute z-40 bg-gray-200 shadow-2xl rounded-lg p-0 m-0 select-none'
        >
            <ul className='flex flex-col'>
                <Item title='Новая папка'/>
                <Item title='Удалить'/>
                <Item title='Переименовать'/>
                <Item title='Загрузить'/>
            </ul>
        </dialog>
    );
};

export default ContextMenu;