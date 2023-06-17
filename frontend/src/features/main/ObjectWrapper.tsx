import React, {ReactNode, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface ObjectWrapperProps {
    children: ReactNode | ReactNode[]
    className?: string
    onDoubleClick: () => void
    onClick: () => void
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
}

const ObjectWrapper = ({children, onDoubleClick, onClick, className, onDrop, onDragOver, onDragStart}: ObjectWrapperProps) => {
    const timer = useRef<NodeJS.Timeout>();
    const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        clearTimeout(timer.current)
        if (event.detail === 1)
            timer.current = setTimeout(onClick, 200)
        else if (event.detail === 2)
            onDoubleClick()
    }
    return (
        <div
            draggable={true}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={'flex flex-col items-center text-center gap-1.5 p-4 rounded-lg bg-white hover:brightness-95 select-none ' + className}
            // onDoubleClick={onDoubleClick} moved to onClick
            onClick={onClickHandler}
        >
            {children}
        </div>
    )
}
export default ObjectWrapper;