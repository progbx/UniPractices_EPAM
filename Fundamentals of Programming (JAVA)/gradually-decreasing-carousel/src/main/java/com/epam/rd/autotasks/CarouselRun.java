package com.epam.rd.autotasks;

import java.util.Arrays;

public class CarouselRun {

    private final int[] arr;
    private int i = 0;
    private int sum = 0;
    private final int flag;
    private int decrement = 1;

    public CarouselRun(int[] arr, int counter) {
        this.arr = Arrays.copyOf(arr, arr.length);
        flag = 0;
        for (int elem : arr) {
            sum += elem;
        }
    }
    public CarouselRun (int[] container, int counter, int flag) {
        this.arr = Arrays.copyOf(container, container.length);
        //i = counter;
        this.flag = flag;
        for (int elem : container ) {
            sum += elem;
        }
    }

    public int next() {
        int tempElem;
        if (isFinished()) {     //container is empty
            return -1;
        }
        if (i == arr.length) {
            i = 0;
            decrement++;
        }
        while (arr[i] <= 0) {
            i++;
            if (i == arr.length) {
                i = 0;
                decrement++;
            }
        }
        if (flag == 0) {
            sum--;
            return arr[i++]--;
        } else if (flag == 1) {
            tempElem = arr[i];
            arr[i] /= 2;
            sum = sum - arr[i] - tempElem % 2;
            i++;
            return tempElem;
        } else {
            tempElem = arr[i];
            arr[i] -= decrement;

            i++;
            return tempElem;
        }
    }

    public boolean isFinished() {
        if (flag == 2) {
            for (int elem : arr) {
                if (elem > 0) {
                    return false;
                }
            }
            return true;
        } else {
            return sum == 0;
        }
    }

}
