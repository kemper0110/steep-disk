package com.steepdisk.steepdisk.controller;


import com.steepdisk.steepdisk.model.storage.Entry;
import com.steepdisk.steepdisk.service.EntryService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Stream;

@AllArgsConstructor
@RestController
@RequestMapping("/entry")
public class EntryController {
    private final EntryService entryService;

    @GetMapping(value = "/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> getFile(@RequestParam String path) {
        System.out.println("requested " + path);

        Resource resource = entryService.loadAsResource(path);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping
    Stream<Entry> getAll(@RequestParam String path) {
        var list = entryService.loadAll(path).toList();
        return list.stream();
    }

    @DeleteMapping
    void delete(@RequestParam String path) {
        System.out.println("requested " + path);
        entryService.delete(path);
    }

    @PatchMapping
    void renameOrMove(@RequestParam String path, @RequestParam String newpath) {
        System.out.println("requested from " + path + " to " + newpath);
        entryService.move(path, newpath);
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
