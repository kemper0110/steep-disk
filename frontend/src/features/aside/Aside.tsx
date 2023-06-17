import React from 'react';
import bullet from '../../ui/Lightning-Bullet.svg';
import UploadButton from "./UploadButton";
import MakeFolderButton from "./MakeFolderButton";


const Item = ({label}: { label: string }) => {
    return (
        <li className='flex items-center gap-1 rounded p-2'>
            <img className='w-[24px] h-[24px]' src={bullet} alt={''}/>
            <span>{label}</span>
        </li>
    )
}
// https://www.svgbackgrounds.com/elements/svg-list-item-bullets/
const Aside = () => {
    // TODO: aside fixed sizes
    const tabs = ['Последние', 'Файлы', 'Фото', 'Альбомы', 'Общий доступ', 'Семья', 'История', 'Архив', 'Загрузки', 'Сканы', 'Корзина']
    return (
        <div className='bg-white/60 min-w-[272px] rounded-l-2xl flex flex-col p-4 gap-2'>
            <UploadButton/>
            <MakeFolderButton/>
            <ul className='flex flex-col'>
                {tabs.map(v => <Item key={v} label={v}/>)}
            </ul>
        </div>
    );
};

export default Aside;