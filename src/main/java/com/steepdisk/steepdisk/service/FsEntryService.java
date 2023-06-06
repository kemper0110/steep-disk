package com.steepdisk.steepdisk.service;

import com.steepdisk.steepdisk.model.Entry;
import com.steepdisk.steepdisk.model.File;
import com.steepdisk.steepdisk.model.Folder;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
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

    @Override
    public void delete(String path) {

    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
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
            else if (file.isFile())
            {
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
