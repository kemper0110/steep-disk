import React, {ReactNode} from "react";

const ObjectWrapper = ({children, onDoubleClick}: { children: ReactNode | ReactNode[], onDoubleClick: () => void }) => {
    return (
        <div className='flex flex-col items-center gap-1.5 p-4 rounded-lg hover:bg-superlight select-none'
             onDoubleClick={onDoubleClick}
        >
            {children}
        </div>
    )
}
export default ObjectWrapper;