package com.epam.rd.autotasks;
import java.util.LinkedList;
import java.util.Queue;

public class DecrementingCarousel {
    private final Queue<Integer> elements;
    private final int capacity;
    private CarouselRun carouselRun;
    public DecrementingCarousel(int capacity) {
        this.capacity = capacity;
        this.elements = new LinkedList<>();
    }

    public boolean addElement(int element){
        if (element <= 0 || elements.size() == capacity || carouselRun != null) {
            return false;
        }
        elements.add(element);
        return true;
    }

    public CarouselRun run(){
        if (carouselRun != null) {
            return null;
        }
        carouselRun = new CarouselRun(elements);
        return carouselRun;
    }
}
