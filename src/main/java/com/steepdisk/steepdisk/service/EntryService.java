package com.steepdisk.steepdisk.service;

import com.steepdisk.steepdisk.model.storage.Entry;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Stream;

public interface EntryService {
    void store(String path, MultipartFile file);
    void delete(String path);
//    void rename(String from, String to);
    void move(String from, String to);
    Resource loadAsResource(String filename);
    Stream<Entry> loadAll(String path);
    void makeFolder(String location, String name);
}
