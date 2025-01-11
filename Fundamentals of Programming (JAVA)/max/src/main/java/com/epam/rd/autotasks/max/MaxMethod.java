package com.epam.rd.autotasks.max;

public class MaxMethod {
    public static int max(int[] values) {
        int maxValue = Integer.MIN_VALUE;
        for (int array : values) {
            if (array > maxValue) {
                maxValue = array;
            }
        }
        return maxValue;
    }
}
