package com.steepdisk.steepdisk.model.storage;

public final class File extends Entry {
    private String mimetype;
    private Long size;
    public File() {
        super("file");
    }
    public File(String name, String path, String mimetype, Long size) {
        super("file", name, path);
        this.mimetype = mimetype;
        this.size = size;
    }
}
