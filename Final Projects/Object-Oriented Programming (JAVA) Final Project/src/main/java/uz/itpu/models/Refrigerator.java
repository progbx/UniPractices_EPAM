package uz.itpu.models;

public class Refrigerator extends Product<Refrigerator> {
    public Refrigerator(int id, String name, String category, double price, int quantity) {
        super("Refrigerator", id, name, category, price, quantity);
    }
}
