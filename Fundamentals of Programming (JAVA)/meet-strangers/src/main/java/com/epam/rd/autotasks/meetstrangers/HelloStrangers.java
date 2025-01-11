package com.epam.rd.autotasks.meetstrangers;

import java.io.IOException;
import java.util.Scanner;
public class HelloStrangers {
    public static void main(String[] args) throws IOException {
        //Write a program, asks for a number - amount of strangers to meet.
        //Then reads stranger names line by line and prints line by line "Hello, ...".
        Scanner scan = new Scanner(System.in);
        int a = scan.nextInt();
        scan.nextLine();
        if ( a < 0 ){
            System.out.print("Seriously? Why so negative?");
        } else if (  a == 0) {
            System.out.print("Oh, it looks like there is no one here");
        } else {
            String[] strangers = new String[a];
            for (int i = 0; i < a; i++) {
                strangers[i] = scan.nextLine();
            }
            for (String stranger : strangers) {
                System.out.println("Hello, " + stranger);
            }
        }
        scan.close();
    }
}
