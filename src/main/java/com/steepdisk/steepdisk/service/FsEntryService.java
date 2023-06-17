package com.steepdisk.steepdisk.service;

import com.steepdisk.steepdisk.model.storage.Entry;
import com.steepdisk.steepdisk.model.storage.File;
import com.steepdisk.steepdisk.model.storage.Folder;
import lombok.SneakyThrows;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FsEntryService implements EntryService {
    @Value("${storage.location}")
    private Path location;

    @SneakyThrows
    @Override
    public void store(String path, MultipartFile file) {
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        checkPath(filename);
        var writePath = this.location.resolve(path).resolve(filename);
        System.out.println("write path " + writePath);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, writePath, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    @SneakyThrows
    @Override
    public void delete(String path) {
        Path p = location.resolve(path);
        java.io.File f = p.toFile();
        if (f.isDirectory()) {
            FileUtils.deleteDirectory(f);
        } else if (f.isFile()) {
            FileUtils.forceDelete(f);
        }
    }

    @SneakyThrows
    @Override
    public void move(String from, String to) {
        var from_p = location.resolve(from);
        var to_p = location.resolve(to);
        Files.move(from_p, to_p);
    }

    @Override
    @SneakyThrows
    public Resource loadAsResource(String filename) {
        Path file = location.resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable())
            return resource;
        throw new Exception("Could not read file: " + filename);
    }

    @SneakyThrows
    @Override
    public Stream<Entry> loadAll(String path) {
        var dataPath = location.resolve(path);
        Stream<Path> stream = Files.walk(dataPath, 1);
        return stream.filter(p -> !p.equals(dataPath)).map(p -> {
            var file = p.toFile();
            var filepath = location.relativize(p).toString();
            if (file.isDirectory())
                return new Folder(file.getName(), filepath);
            else if (file.isFile()) {
                try {
                    return new File(file.getName(), filepath, "", Files.size(p));
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                }
            }
            return null;
        });
    }

    @SneakyThrows
    @Override
    public void makeFolder(String location, String name) {
        var dataPath = this.location.resolve(location).resolve(name);
        Files.createDirectories(dataPath);
    }

    @SneakyThrows
    private void checkPath(String path) {
        if (path.contains(".."))
            throw new Exception("Cannot store file with relative path outside current directory " + path);
    }
}
