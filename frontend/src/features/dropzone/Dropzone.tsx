import React from "react";
import {useMutation, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {uploadFile} from "../api/api";


/*
    dragenter: prevent, setTarget, show
    dragleave: prevent, hide
    dragover: prevent
    drop: prevent, dataTransfer, hide, mutate
 */
export const Dropzone = () => {
    const queryClient = useQueryClient()
    const path = useSelector((state: RootState) => state.entries.path)
    const upload = useMutation((file: File) => uploadFile(file, path), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries', path]})
    })
    const [visibility, setVisibility] = React.useState<"hidden" | "visible">('hidden');
    const [opacity, setOpacity] = React.useState(0);
    React.useEffect(() => {
        let last: EventTarget | null = null;
        const show = () => {
            setVisibility("visible")
            setOpacity(100)
        }
        const hide = () => {
            setVisibility("hidden")
            setOpacity(0)
        }
        const ondragenter = (e: DragEvent) => {
            e.preventDefault();
            last = e.target;
            console.log({items: e.dataTransfer?.items, types: e.dataTransfer?.types, files: e.dataTransfer?.files})
            if (e.dataTransfer?.types[0] == 'Files')
                show();
        };
        const ondragleave = (e: DragEvent) => {
            e.preventDefault();
            if (e.target === last || e.target === document)
                hide()
        };
        const ondragover = (e: DragEvent) => {
            e.preventDefault();
        };
        const ondrop = (e: DragEvent) => {
            e.preventDefault();
            if (e.dataTransfer && e.dataTransfer.files.length > 0 && e.dataTransfer.files[0]) {
                hide()
                upload.mutate(e.dataTransfer.files[0])
            } else
                console.log('file upload drop failed')
        };
        window.addEventListener('dragenter', ondragenter)
        window.addEventListener('dragleave', ondragleave)
        window.addEventListener('dragover', ondragover)
        window.addEventListener('drop', ondrop)
        return () => {
            window.removeEventListener('dragenter', ondragenter)
            window.removeEventListener('dragleave', ondragleave)
            window.removeEventListener('dragover', ondragover)
            window.removeEventListener('drop', ondrop)
        }
    }, []);
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-50 w-full h-full bg-black/50
            transition-all duration-150 opacity-0 p-16'
             style={{
                 opacity, visibility: visibility
             }}
        >
            <div className='w-full h-full p-12
                border-8 border-dashed border-white rounded-xl
                text-center
                '>
                <span className='text-7xl font-medium text-white'>Загрузить файлы на диск</span>
            </div>
        </div>
    )
}