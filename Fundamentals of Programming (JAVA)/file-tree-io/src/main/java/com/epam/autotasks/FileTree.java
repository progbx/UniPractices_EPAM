package com.epam.autotasks;

import java.io.File;
import java.util.Arrays;
import java.util.Optional;

public class FileTree {
    public Optional<String> tree(final String path) {
        if (path == null || path.isEmpty()) {
            return Optional.empty();
        }
        File file = new File(path);
        if (!file.exists()) {
            return Optional.empty();
        }
        StringBuilder builder = new StringBuilder();
        buildTree(file, builder, "");
        return Optional.of(builder.toString().trim());
    }

    private void buildTree(File file, StringBuilder builder, String prefix) {
        if (file.isFile()) {
            builder.append(file.getName()).append(" ").append(file.length()).append(" bytes\n");
        } else if (file.isDirectory()) {
            File[] files = file.listFiles();
            Arrays.sort(files, (f1, f2) -> {
                if (f1.isDirectory() && !f2.isDirectory()) {
                    return -1;
                } else if (!f1.isDirectory() && f2.isDirectory()) {
                    return 1;
                } else {
                    return f1.getName().compareToIgnoreCase(f2.getName());
                }
            });
            builder.append(file.getName()).append(" ").append(getDirectorySize(file)).append(" bytes\n");
            for (int i = 0; i < files.length; i++) {
                builder.append(prefix).append(i == files.length - 1 ? "└─ " : "├─ ");
                buildTree(files[i], builder, prefix + (i == files.length - 1 ? "   " : "│  "));
            }
        }
    }

    private long getDirectorySize(File directory) {
        File[] files = directory.listFiles();
        long size = 0;
        for (File file : files) {
            if (file.isFile()) {
                size += file.length();
            } else {
                size += getDirectorySize(file);
            }
        }
        return size;
    }
}