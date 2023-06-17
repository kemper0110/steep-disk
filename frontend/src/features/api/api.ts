import axios from "axios";
import {entry_t} from "../../store/EntrySlice";

export function uploadFile(file: File, path: string) {
    const form = new FormData()
    form.append('file', file)
    form.append('path', path)
    // console.log("sending to path ", path)
    return axios.post('http://localhost:8080/entry', form)
}

export function makeFolder(path: string, name: string) {
    // TODO: make folder
    const url = new URL("http://localhost:8080/entry/folder")
    url.searchParams.append('path', path)
    url.searchParams.append('name', name)
    console.log("creating folder ", url.toString())
    return axios.post(url.toString())
}

export function fileRef(path: string) {
    const url = new URL('http://localhost:8080/entry/download')
    url.searchParams.append('path', path)
    return url.toString()
}

export async function fetchEntries(path: string) {
    const url = new URL('http://localhost:8080/entry');
    url.searchParams.append("path", path);
    // console.log(url.toString());
    const {data} = await axios.get<entry_t[]>(url.toString());
    return data;
}

export function move(path: string, newpath: string) {
    const url = new URL('http://localhost:8080/entry')
    url.searchParams.append('path', path)
    url.searchParams.append('newpath', newpath)
    return axios.patch(url.toString())
}

export function deleteEntry(path: string) {
    // 'localhost:8080/entry?path=folder1'
    const url = new URL('http://localhost:8080/entry')
    url.searchParams.append('path', path)
    return axios.delete(url.toString())
}
