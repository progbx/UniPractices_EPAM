package uz.itpu.models;

public class Iron extends Product<Iron> {
    public Iron(int id, String name, String category, double price, int quantity) {
        super("Iron", id, name, category, price, quantity);
    }
}