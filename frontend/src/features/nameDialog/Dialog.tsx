import React, {useState} from 'react';


const isClickInsideRectangle = (e: React.MouseEvent<HTMLDialogElement>, element: HTMLElement) => {
    const r = element.getBoundingClientRect();
    return (
        e.clientX > r.left &&
        e.clientX < r.right &&
        e.clientY > r.top &&
        e.clientY < r.bottom
    );
};

interface Props {
    title: string
    isOpened: boolean
    onProceed: (name: string) => void
    onClose: () => void
}

const Dialog = ({title, isOpened, onProceed, onClose}: Props) => {
    const [name, setName] = useState("")
    const dialog = React.useRef<HTMLDialogElement>(null);
    React.useEffect(() => {
        if (isOpened) {
            dialog.current?.showModal();
            // TODO: prevent bg scroll
            document.body.classList.add("modal-open"); // prevent bg scroll
        } else {
            dialog.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened]);
    return (
        <dialog
            ref={dialog}
            className='w-[400px] border-2 rounded-lg border-gray-400 backdrop-blur-3xl'
            onClick={e => dialog.current && !isClickInsideRectangle(e, dialog.current) && onClose()}
        >
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <h3>{title}</h3>
                    <button onClick={onClose}>X</button>
                </div>
                <input
                    className='border-2 border-amber-400 rounded-lg'
                    onChange={e => setName(e.target.value)} value={name}/>
                <div className='text-right'>
                    <button className='p-2 bg-amber-400 rounded-lg text-sm
                    disabled:bg-gray-200 disabled:text-gray-400'
                            disabled={name === ""}
                            onClick={() => {
                                setName("")
                                onProceed(name)
                            }}>Сохранить
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default Dialog;