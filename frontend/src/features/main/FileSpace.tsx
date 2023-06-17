import {useQuery} from "react-query";
import React from "react";
import Entry from './Entry';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {fetchEntries} from "../api/api";

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
    console.log(data)
    return (
        <div className='grid grid-cols-entries_template'>
            {data.map(entry => <Entry key={entry.name + entry.type} entry={entry}/>)}
        </div>
    )
}