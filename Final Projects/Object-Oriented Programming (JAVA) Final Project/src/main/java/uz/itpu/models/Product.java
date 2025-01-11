package uz.itpu.models;

public abstract class Product<SELF extends Product> {
    private String model;
    private int id;
    private String name;
    private String category;
    private double price;
    private int quantity;

    public Product(String model, int id, String name, String category, double price, int quantity) {
        this.model = model;
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public String getModel() {
        return model;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public SELF setId(int id) {
        this.id = id;
        return (SELF) this;
    }

    public SELF setName(String name) {
        this.name = name;
        return (SELF) this;
    }

    public SELF setCategory(String category) {
        this.category = category;
        return (SELF) this;
    }

    public SELF setPrice(double price) {
        this.price = price;
        return (SELF) this;
    }

    public SELF setQuantity(int quantity) {
        this.quantity = quantity;
        return (SELF) this;
    }

    @Override
    public String toString() {
        return model + ". ID: " + id + ", Name: " + name + ", Category: " + category + ", Price: " + price + ", Quantity: " + quantity;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Product<?> product = (Product<?>) obj;
        return id == product.id;
    }
}