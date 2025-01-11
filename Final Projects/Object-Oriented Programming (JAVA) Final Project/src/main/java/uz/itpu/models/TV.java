package uz.itpu.models;

public class TV extends Product<TV> {
    public TV(int id, String name, String category, double price, int quantity) {
        super("TV", id, name, category, price, quantity);
    }
}