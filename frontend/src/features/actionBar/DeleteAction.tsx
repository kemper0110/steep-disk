import {entry_t} from "../../store/EntrySlice";
import {ActionItem} from "./ActionItem";
import React from "react";
import {useMutation, useQueryClient} from "react-query";
import {deleteEntry} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {actionClose} from "../../store/ActionSlice";

export const DeleteAction = ({entry}: { entry: entry_t }) => {
    const dispatch = useDispatch<AppDispatch>()
    const path = useSelector((state: RootState) => state.entries.path)
    const queryClient = useQueryClient()
    const deleteMutation = useMutation(() => deleteEntry(entry.path), {
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['entries', path]})
    })
    const onDelete = () => {
        deleteMutation.mutate()
        dispatch(actionClose())
    }
    return (
        <ActionItem title='Удалить' onClick={onDelete}/>
    )
}