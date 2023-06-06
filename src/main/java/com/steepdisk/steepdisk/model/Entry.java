package com.steepdisk.steepdisk.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Entry {
    public Entry(String type) {
        this.type = type;
    }
    final private String type;
    private String name;
    private String path;
}
