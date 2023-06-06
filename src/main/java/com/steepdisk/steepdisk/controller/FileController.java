package com.steepdisk.steepdisk.controller;

import com.steepdisk.steepdisk.service.FileService;
import jdk.jfr.ContentType;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

@AllArgsConstructor
@RestController
@RequestMapping("/file")
public class FileController {
    final private FileService fileService;

    @GetMapping
    public Stream<Path> getAll() {
        return fileService.loadAll();
    }

    @GetMapping(value = "/{filename:.+}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        System.out.println("requested " + filename);

        Resource resource = fileService.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping
    public void uploadFile(@RequestParam("file") MultipartFile file) {
        String name = fileService.store(file);
    }

}
