package com.epam.rd.autotasks;

class CycleSwap {
    static void cycleSwap(int[] array) {
        if (array.length > 0) {
            int last = array[array.length - 1];
            System.arraycopy(array, 0, array, 1, array.length - 1);
            array[0] = last;
        }
    }

    static void cycleSwap(int[] array, int shift) {
        if (array.length > 0) {
            int actualShift = shift % array.length;
            int[] temp = new int[actualShift];
            System.arraycopy(array, array.length - actualShift, temp, 0, actualShift);
            System.arraycopy(array, 0, array, actualShift, array.length - actualShift);
            System.arraycopy(temp, 0, array, 0, actualShift);
        }
    }
}
