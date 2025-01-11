package com.epam.rd.autotasks;

public class DecrementingCarousel {
    private final int[] arr;
    private final int capacity;
    private int i=0;
    private byte state=0;
    public DecrementingCarousel(int capacity) throws UnsupportedOperationException {
        if (capacity<=0) {
            throw new UnsupportedOperationException();
        } else {
            arr = new int[capacity];
            this.capacity=capacity;
        }
    }

    public boolean addElement(int element)  {
        if (state ==1) {
            return false;
        }
        if (element<=0) {
            return false;
        }
        if (i>=capacity) {
            return false;
        }
        arr[i] = element;
        i++;
        return true;
    }

    public int[] getArr() {
        return arr;
    }

    public int getCapacity() {
        return capacity;
    }

    public byte getState() {
        return state;
    }

    public void setState(byte state) {
        this.state = state;
    }

    public int getI() {
        return i;
    }

    public CarouselRun run() {
        if (state==1) {
            return null;
        }
        state=1;
        return new CarouselRun(arr,i);
    }
}
