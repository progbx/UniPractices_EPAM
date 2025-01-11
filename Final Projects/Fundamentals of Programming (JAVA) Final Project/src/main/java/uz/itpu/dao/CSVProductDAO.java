package uz.itpu.dao;

import uz.itpu.models.Product;
import uz.itpu.models.ProductFactory;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class CSVProductDAO<P extends Product<P>> implements ProductDAO<P> {
    private File csvFile;

    public CSVProductDAO(String csvFilePath) {
        this.csvFile = new File(csvFilePath);
    }

    @Override
    public List<Product<?>> getAllProducts() {
        List<Product<?>> products = new ArrayList<>();
        try (Scanner scanner = new Scanner(csvFile)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                P product = createProductFromCSVLine(line);
                if (product != null) {
                    products.add(product);
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return products;
    }

    protected P createProductFromCSVLine(String line) {
        String[] fields = line.split(",");
        String type = fields[0];
        int id = Integer.parseInt(fields[1]);
        String name = fields[2];
        String category = fields[3];
        double price = Double.parseDouble(fields[4]);
        int quantity = Integer.parseInt(fields[5]);

        return (P) ProductFactory.createProduct(type, id, name, category, price, quantity);
    }

    @Override
    public List<Product<?>> getProductsById(int id) {
        return getAllProducts().stream()
                .filter(product -> product.getId() == id)
                .collect(Collectors.toList());
    }

    @Override
    public void updateProduct(Product<P> product) {
        List<Product<?>> products = getAllProducts();
        for (Product<?> p : products) {
            if (p.getId() == product.getId()) {
                p.setName(product.getName());
                p.setCategory(product.getCategory());
                p.setPrice(product.getPrice());
                p.setQuantity(product.getQuantity());
                break;
            }
        }
        writeProductsToFile(products);
    }

    @Override
    public void deleteProduct(int id) {
        List<Product<?>> products = getAllProducts();
        products.removeIf(p -> p.getId() == id);
        writeProductsToFile(products);
    }

    @Override
    public void addProduct(Product<P> product) {
        List<Product<?>> products = getAllProducts();
        products.add(product);
        writeProductsToFile(products);
    }

    private void writeProductsToFile(List<Product<?>> products) {
        try (PrintWriter writer = new PrintWriter(csvFile)) {
            for (Product<?> product : products) {
                writer.println(product.getModel() + "," + product.getId() + "," + product.getName() + "," + product.getCategory() + "," + product.getPrice() + "," + product.getQuantity());
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
