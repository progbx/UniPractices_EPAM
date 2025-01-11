package com.epam.rd.autocode.collection.list;

import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
public class SingleLinkedListImpl implements List {
    private Node head;
    private int size;

    private class Node {
        Object data;
        Node next;

        Node(Object data, Node next) {
            this.data = data;
            this.next = next;
        }
    }

    public SingleLinkedListImpl() {
        this.head = null;
        this.size = 0;
    }

    @Override
    public void clear() {
        head = null;
        size = 0;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean add(Object el) {
        if (el == null) {
            throw new NullPointerException();
        }
        head = new Node(el, head);
        size++;
        return true;
    }

    @Override
    public Optional<Object> remove(Object el) {
        if (el == null) {
            throw new NullPointerException();
        }
        Node prev = null;
        for (Node node = head; node != null; node = node.next) {
            if (Objects.equals(node.data, el)) {
                if (prev != null) {
                    prev.next = node.next;
                } else {
                    head = node.next;
                }
                size--;
                return Optional.of(node.data);
            }
            prev = node;
        }
        return Optional.empty();
    }

    @Override
    public Object get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        Node node = head;
        for (int i = 0; i < size - index - 1; i++) {
            node = node.next;
        }
        return node.data;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        Node node = head;
        while (node != null) {
            sb.append(node.data);
            if (node.next != null) {
                sb.append(", ");
            }
            node = node.next;
        }
        sb.append("]");
        return sb.toString();
    }

    @Override
    public Iterator<Object> iterator() {
        return new Iterator<Object>() {
            private Node current = head;
            private Node lastReturned = null;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public Object next() {
                if (current == null) {
                    throw new NoSuchElementException();
                }
                lastReturned = current;
                current = current.next;
                return lastReturned.data;
            }

            @Override
            public void remove() {
                if (lastReturned == null) {
                    throw new IllegalStateException();
                }
                Node current = head;
                Node prev = null;
                while (current != null && !current.equals(lastReturned)) {
                    prev = current;
                    current = current.next;
                }
                if (prev == null) {
                    head = current.next;
                } else {
                    prev.next = current.next;
                }
                size--;
                lastReturned = null;
            }
        };
    }
}
