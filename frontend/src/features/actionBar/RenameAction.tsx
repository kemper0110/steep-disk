import {entry_t} from "../../store/EntrySlice";
import React, {useState} from "react";
import {ActionItem} from "./ActionItem";
import {useMutation, useQueryClient} from "react-query";
import {move} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import Dialog from "../nameDialog/Dialog";
import {actionClose} from "../../store/ActionSlice";

export const RenameAction = ({entry}: { entry: entry_t }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpen, setIsOpen] = useState(false);
    const path = useSelector((state: RootState) => state.entries.path)
    const queryClient = useQueryClient()
    const renameMutation = useMutation(({path, newpath}: {path: string, newpath: string}) => move(path, newpath), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries', path]})
    })
    const onRename = (name: string) => {
        const newpath = entry.path.substring(0, entry.path.indexOf('/') + 1) + name
        console.log("from " + entry.path + " to " + newpath)
        setIsOpen(false)
        renameMutation.mutate({path: entry.path, newpath})
        dispatch(actionClose())
    }
    return (
        <>
            <Dialog title='Новое название' isOpened={isOpen} onProceed={onRename} onClose={() => setIsOpen(false)}/>
            <ActionItem title='Переименовать' onClick={() => setIsOpen(true)}/>
        </>
    )
}