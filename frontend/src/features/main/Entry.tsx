import React from "react";
import Folder from "./Folder";
import File from "./File";
import {entry_t} from "../../store/EntrySlice";

const Entry = ({entry}: { entry: entry_t }) => {
    switch (entry.type) {
        case "file":
            return <File file={entry}/>
        case "folder":
            return <Folder folder={entry}/>
    }
}

export default Entry;