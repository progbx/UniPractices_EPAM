package com.epam.rd.autotask.io.serialization;

import java.io.*;

public class OrderSerializer {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
    }
    public static void serializeOrder(Order order, OutputStream sink) throws IOException {
        try (ObjectOutputStream oos = new ObjectOutputStream(sink)) {
            oos.writeObject(order);
        }
    }
    public static Order deserializeOrder(InputStream sink) throws IOException, ClassNotFoundException {
        try (ObjectInputStream ois = new ObjectInputStream(sink)) {
            return (Order) ois.readObject();
        }
    }
}
