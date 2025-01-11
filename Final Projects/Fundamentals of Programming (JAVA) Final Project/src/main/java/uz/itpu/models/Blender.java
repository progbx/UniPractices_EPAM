package uz.itpu.models;

public class Blender extends Product<Blender> {
    public Blender(int id, String name, String category, double price, int quantity) {
        super("Blender", id, name, category, price, quantity);
    }
}