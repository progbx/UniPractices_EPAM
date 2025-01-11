package com.epam.rd.autotasks;

import java.util.Scanner;

public class Average {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Use Scanner methods to read input
        int sum = 0;
        int count = 0;
        int num;

        while ((num = scanner.nextInt()) != 0) {
            sum += num;
            count++;
        }

        System.out.print(sum / count);
    }

}