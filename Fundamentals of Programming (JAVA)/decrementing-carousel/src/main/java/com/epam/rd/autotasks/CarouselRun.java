package com.epam.rd.autotasks;
import java.util.LinkedList;
import java.util.Queue;

public class CarouselRun {
    private final Queue<Integer> elements;
    public CarouselRun(Queue<Integer> elements) {
        this.elements = elements;
    }
    public int next() {
        while (!elements.isEmpty()) {
            int element = elements.poll();
            if (element > 1) {
                elements.add(element - 1);
            }
            return element;
        }
        return -1;
    }

    public boolean isFinished() {
        return elements.isEmpty();
    }

}
