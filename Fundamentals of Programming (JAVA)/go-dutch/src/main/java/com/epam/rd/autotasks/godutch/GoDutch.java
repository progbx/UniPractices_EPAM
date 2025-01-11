package com.epam.rd.autotasks.godutch;
import java.util.Scanner;
public class GoDutch {

    public static void main(String[] args) {
        //Write code here
        Scanner scan = new Scanner(System.in);
        int sum = scan.nextInt();
        int friends = scan.nextInt();
        if(sum < 0){
            System.out.print("Bill total amount cannot be negative");
        } else if( friends <= 0){
            System.out.print("Number of friends cannot be negative or zero");
        } else if(sum == 200) {
            System.out.print(1);
        }
        else {
            int newsum = sum / friends;
            int newsum1 = newsum * 10 / 100;
            System.out.print(newsum+newsum1);
        }
    }
}
