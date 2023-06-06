import {useQuery} from "react-query";
import React from "react";
import axios from "axios";
import {entry_t} from "../../store/EntrySlice";
import Entry from './Entry';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

async function fetchEntries(path: string) {
    const url = new URL('http://localhost:8080/entry');
    url.searchParams.append("path", path);
    // console.log(url.toString());
    const {data} = await axios.get<entry_t[]>(url.toString());
    return data;
}

export const FileSpace = () => {
    const path = useSelector((state: RootState) => state.entries.path);
    const {data, isLoading, isError} = useQuery(['entries', path], () => fetchEntries(path),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: true,
        });
    if (isLoading)
        return <h3>Loading</h3>;
    if (isError)
        return <h3>Error</h3>;
    if (!data)
        return <h3>No data</h3>;
    return (
        <div className='flex'>
            {data.map(entry => <Entry key={entry.name + entry.type} entry={entry}/>)}
        </div>
    )
}