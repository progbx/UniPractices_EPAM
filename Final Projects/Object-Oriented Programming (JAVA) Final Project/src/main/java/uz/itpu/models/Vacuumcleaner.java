package uz.itpu.models;

public class Vacuumcleaner extends Product<Vacuumcleaner> {
    public Vacuumcleaner(int id, String name, String category, double price, int quantity) {
        super("Vacuumcleaner", id, name, category, price, quantity);
    }
}
