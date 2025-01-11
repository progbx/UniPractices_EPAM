package com.epam.rd.autotasks.meetautocode;

import java.util.Scanner;

public class ElectronicWatch {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int seconds = scanner.nextInt();
        seconds = seconds % 86400;
        int hours = 0, minutes = 0;
        hours = seconds / 3600;
        minutes = (seconds % 3600) / 60;
        int newSeconds = (seconds % 3600) % 60;
        String outputFormat = String.format("%d:%02d:%02d", hours, minutes, newSeconds);
        System.out.println(outputFormat);
    }
}
