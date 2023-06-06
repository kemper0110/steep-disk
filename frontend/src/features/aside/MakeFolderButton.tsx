import React from 'react';
import {useMutation, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import axios from "axios";



function makeFolder(path: string, name: string) {
    // TODO: make folder
    const url = new URL("http://localhost:8080/entry/folder")
    url.searchParams.append('path', path)
    url.searchParams.append('name', name)
    console.log("creating folder ", url.toString())
    return axios.post(url.toString())
}

const MakeFolderButton = () => {
    const path = useSelector((state: RootState) => state.entries.path)
    const queryClient = useQueryClient()
    const makeFolderMutation = useMutation((name: string) => makeFolder(path, name), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries', path]})
    })
    const onClick = () => {
        const r = (Math.random() + 1).toString(36).substring(7)
        makeFolderMutation.mutate(r)
    }
    return (
        <>
            <dialog>

            </dialog>
            <button className='shadow rounded-lg bg-white p-1.5 font-medium hover:bg-superlight'
                    onClick={onClick}
            >
                Создать папку
            </button>
        </>
    );
};

export default MakeFolderButton;