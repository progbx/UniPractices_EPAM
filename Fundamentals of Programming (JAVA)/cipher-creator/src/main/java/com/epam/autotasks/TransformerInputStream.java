package com.epam.autotasks;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

public class TransformerInputStream extends FilterInputStream {

    protected TransformerInputStream(InputStream in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c;
        while ((c = super.read()) != -1) {
            char character = (char) c;
            if (Character.isLetter(character)) {
                return transform(character);
            }
            if (character == '\n') {
                return character;
            }
        }
        return -1;
    }

    private int transform(char c) {
        if (c >= 'A' && c <= 'Z') {
            return ((c - 'A' + 2) % 26) + 'A';
        } else if (c >= 'a' && c <= 'z') {
            return ((c - 'a' + 2) % 26) + 'a';
        } else {
            return c;
        }
    }

    @Override
    public void close() throws IOException {
        super.close();
        System.out.println("Stream closed.");
    }
}