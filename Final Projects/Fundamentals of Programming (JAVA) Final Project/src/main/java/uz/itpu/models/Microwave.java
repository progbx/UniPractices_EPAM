package uz.itpu.models;

public class Microwave extends Product<Microwave> {
    public Microwave(int id, String name, String category, double price, int quantity) {
        super("Microwave", id, name, category, price, quantity);
    }
}
