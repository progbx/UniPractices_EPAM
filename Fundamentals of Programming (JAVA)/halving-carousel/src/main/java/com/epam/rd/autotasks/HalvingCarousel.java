package com.epam.rd.autotasks;

import java.util.ArrayList;

public class HalvingCarousel extends DecrementingCarousel {
    private boolean isRunning;
    private int capacity;
    private CarouselRun carouselRun;


    public HalvingCarousel(int capacity) {
        super(capacity);
        this.isRunning = false;
        this.capacity = capacity;
        this.carouselRun = new CarouselRun("/");
    }

    public boolean addElement(int element) {

        if (isRunning) {
            return false;
        }

        if (element > 0 && capacity > 0) {
            carouselRun.setAmountOfNotZeroElements(carouselRun.getAmountOfNotZeroElements() + 1);
            carouselRun.getCarousel().add(element);
            capacity = capacity - 1;
            return true;
        } else {
            return false;
        }
    }

    public CarouselRun run() {
        if (isRunning) {
            return null;
        } else {
            isRunning = true;
            return carouselRun;
        }
    }
}
