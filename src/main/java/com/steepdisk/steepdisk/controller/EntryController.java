package com.steepdisk.steepdisk.controller;


import com.steepdisk.steepdisk.model.Entry;
import com.steepdisk.steepdisk.model.File;
import com.steepdisk.steepdisk.model.Folder;
import com.steepdisk.steepdisk.service.EntryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.IntStream;
import java.util.stream.Stream;

@AllArgsConstructor
@RestController
@RequestMapping("/entry")
public class EntryController {
    private final EntryService entryService;

    @GetMapping("/e")
    Entry get1() {
        return new Entry("file", "aboba", ".....");
    }

    @GetMapping("/folder")
    Entry get2() {
        return new Folder("abob", "...");
    }

    @GetMapping("/file")
    Entry get3() {
        return new File("abob", "...", "", 12441L);
    }

    @GetMapping("/el")
    Stream<Entry> get4() {
        return IntStream.range(0, 4).mapToObj(i ->
                new File("abob", "...", "", 12441L)
        );
    }

    @GetMapping
    Stream<Entry> getAll(@RequestParam String path) {
        var list = entryService.loadAll(path).toList();
        return list.stream();
    }

    @PostMapping
    void store(@RequestParam String path, @RequestParam MultipartFile file) {
        entryService.store(path, file);
    }

    @PostMapping("/folder")
    void makeFolder(@RequestParam String path, @RequestParam String name) {
        entryService.makeFolder(path, name);
    }
}
