package com.steepdisk.steepdisk.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public final class Folder extends Entry {
    public Folder(String name, String path) {
        super("folder", name, path);
    }

    Folder() {
        super("folder");
    }
}
