package com.steepdisk.steepdisk.model.storage;

public final class Folder extends Entry {
    public Folder(String name, String path) {
        super("folder", name, path);
    }

    Folder() {
        super("folder");
    }
}
