package uz.itpu.models;

public class ProductFactory {

    public static Product createProduct(String type, int id, String name, String category, double price, int quantity) {
        switch (type.toLowerCase()) {
            case "blender":
                return new Blender(id, name, category, price, quantity);
            case "iron":
                return new Iron(id, name, category, price, quantity);
            case "microwave":
                return new Microwave(id, name, category, price, quantity);
            case "oven":
                return new Oven(id, name, category, price, quantity);
            case "refrigerator":
                return new Refrigerator(id, name, category, price, quantity);
            case "tv":
                return new TV(id, name, category, price, quantity);
            case "vacuumcleaner":
                return new Vacuumcleaner(id, name, category, price, quantity);
            case "washingmachine":
                return new Washingmachine(id, name, category, price, quantity);
            default:
                throw new IllegalArgumentException("Invalid product type: " + type);
        }
    }
}