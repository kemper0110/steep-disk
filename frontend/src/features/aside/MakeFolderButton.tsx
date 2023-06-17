import React, {useState} from 'react';
import {useMutation, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {makeFolder} from "../api/api";
import Dialog from "../nameDialog/Dialog";


const MakeFolderButton = () => {
    const [dialogOpened, setDialogOpened] = useState(false);

    const path = useSelector((state: RootState) => state.entries.path)
    const queryClient = useQueryClient()
    const makeFolderMutation = useMutation((name: string) => makeFolder(path, name), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries', path]})
    })
    const onClick = () => {
        setDialogOpened(true)
    }
    const onProceed = (name: string) => {
        setDialogOpened(false)
        makeFolderMutation.mutate(name)
    };
    return (
        <>
            <Dialog title='Укажите название папки' isOpened={dialogOpened} onProceed={onProceed} onClose={() => setDialogOpened(false)}/>
            <button className='shadow rounded-lg bg-white p-1.5 font-medium hover:bg-superlight'
                    onClick={onClick}
            >
                Создать папку
            </button>
        </>
    );
};

export default MakeFolderButton;