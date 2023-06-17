import React from "react";



interface ItemProps {
    title: string
    onClick?: () => void
}

export const ActionItem = ({title, onClick}: ItemProps) => {
    return (
        <button className='text-white px-4' onClick={onClick}>
            {title}
        </button>
    )
}