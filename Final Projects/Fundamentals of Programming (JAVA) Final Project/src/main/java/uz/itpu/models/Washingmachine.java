package uz.itpu.models;

public class Washingmachine extends Product<Washingmachine> {
    public Washingmachine(int id, String name, String category, double price, int quantity) {
        super("Washingmachine", id, name, category, price, quantity);
    }
}
