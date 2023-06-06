import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";

function uploadFile(file: File, path: string) {
    const form = new FormData()
    form.append('file', file)
    form.append('path', path)
    // console.log("sending to path ", path)
    return axios.post('http://localhost:8080/entry', form)
}

const UploadButton = () => {
    const queryClient = useQueryClient()
    const path = useSelector((state: RootState) => state.entries.path)
    // ['entries', path],
    const upload = useMutation((file: File) => uploadFile(file, path), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries', path]})
    })
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0)
            if (event.target.files[0])
                upload.mutate(event.target.files[0])
    };
    return (
        <label className='text-center'>
            <input type='file' className='opacity-0 -z-10 block w-0 h-0 text-inherit m-0' onChange={onChange}/>
            <div
                className='font-medium cursor-pointer bg-yellow-300/90 hover:bg-yellow-400/90 rounded-lg shadow p-1.5'>Загрузить
            </div>
        </label>
    );
};

export default UploadButton;