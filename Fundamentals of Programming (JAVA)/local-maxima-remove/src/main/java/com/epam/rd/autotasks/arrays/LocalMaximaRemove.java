package com.epam.rd.autotasks.arrays;

import java.util.Arrays;

public class LocalMaximaRemove {

    public static void main(String[] args) {
        int[] array = new int[]{18, 1, 3, 6, 7, -5};

        System.out.println(Arrays.toString(removeLocalMaxima(array)));
    }

    public static int[] removeLocalMaxima(int[] array){

        //put your code here
        int[] result = new int[array.length];
        int resultIndex = 0;
        if (array[0] <= array[1]) {
            result[resultIndex++] = array[0];
        }
        for (int i = 1; i < array.length - 1; i++) {
            if (array[i] > array[i - 1] && array[i] > array[i + 1]) {
                continue; // Skip local maximum
            }
            result[resultIndex++] = array[i];
        }

        // Check the last element
        if (array[array.length - 1] <= array[array.length - 2]) {
            result[resultIndex++] = array[array.length - 1];
        }

        return Arrays.copyOf(result, resultIndex);
    }
}
