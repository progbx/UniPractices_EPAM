package com.epam.rd.autotasks.pizzasplit;
import java.util.Scanner;
import java.math.BigInteger;
public class PizzaSplit {
    public static int lcm(int a, int b) {
        BigInteger b1 = BigInteger.valueOf(a);
        BigInteger b2 = BigInteger.valueOf(b);
        BigInteger gcd = b1.gcd(b2);
        BigInteger lcm = (b1.multiply(b2)).divide(gcd);
        return lcm.intValue();
    }

    public static int pizzaCount(int m, int n) {
        int lcm = lcm(m, n);
        return lcm / n;
    }
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int m = scan.nextInt();
        int n = scan.nextInt();
        int count = pizzaCount(m, n);
        System.out.println(count);
    }
}
