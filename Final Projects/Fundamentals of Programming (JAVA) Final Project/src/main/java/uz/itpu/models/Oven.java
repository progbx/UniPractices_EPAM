package uz.itpu.models;

public class Oven extends Product<Oven> {
    public Oven(int id, String name, String category, double price, int quantity) {
        super("Oven", id, name, category, price, quantity);
    }
}
