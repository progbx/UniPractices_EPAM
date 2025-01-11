package com.epam.rd.autotasks.snail;
import java.util.Scanner;

public class Snail
{
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int a = in.nextInt(), b = in.nextInt(), h = in.nextInt();
        int current = 0;
        int days = 0;

        while (current < h) {
            if (days > 999) {
                System.out.println("Impossible");
                break;
            }
            days++;
            current += a;
            if (current >= h) {
                System.out.println(days);
                break;
            }
            current -= b;
        }
    }
}
