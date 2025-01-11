package com.epam.rd.autotasks;

class Spiral {
    static int[][] spiral(int rows, int columns) {
        int[][] result = new int[rows][columns];
        int value = 1;
        int minRow = 0, maxRow = rows - 1;
        int minCol = 0, maxCol = columns - 1;

        while (value <= rows * columns) {
            for (int i = minCol; i <= maxCol && value <= rows * columns; i++) {
                result[minRow][i] = value++;
            }
            minRow++;
            for (int i = minRow; i <= maxRow && value <= rows * columns; i++) {
                result[i][maxCol] = value++;
            }
            maxCol--;
            for (int i = maxCol; i >= minCol && value <= rows * columns; i--) {
                result[maxRow][i] = value++;
            }
            maxRow--;
            for (int i = maxRow; i >= minRow && value <= rows * columns; i--) {
                result[i][minCol] = value++;
            }
            minCol++;
        }
        return result;
    }
}
