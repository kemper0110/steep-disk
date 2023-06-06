package com.steepdisk.steepdisk.service;

import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
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
public class FsFileService implements FileService {
//        Files.createDirectories(location);
    @Value("${storage.location}")
    private Path location;
    @SneakyThrows
    @Override
    public String store(MultipartFile file) {
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        if (file.isEmpty())
            throw new Exception("Failed to store empty file " + filename);
        if (filename.contains("..")) {
            throw new Exception(
                    "Cannot store file with relative path outside current directory "
                            + filename);
        }
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, this.location.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        }
        return filename;
    }

    @SneakyThrows
    @Override
    public Stream<Path> loadAll() {
        return Files.walk(this.location, 1)
                .filter(path -> !path.equals(this.location))
                .map(this.location::relativize);
    }

    @Override
    public Path load(String filename) {
        return location.resolve(filename);
    }

    @SneakyThrows
    @Override
    public Resource loadAsResource(String filename) {
        Path file = load(filename);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable())
            return resource;
        throw new Exception("Could not read file: " + filename);
    }
}
