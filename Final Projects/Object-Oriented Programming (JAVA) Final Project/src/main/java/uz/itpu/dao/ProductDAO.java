package uz.itpu.dao;

import uz.itpu.models.Product;

import java.util.List;

public interface ProductDAO<P extends Product<P>> {
//    List<Product<Product>> getAllProducts();
//    List<Product<Product>> getProductsById(int id);
//    void updateProduct(Product<Product> product);
//    void deleteProduct(int id);
//    void addProduct(Product<Product> product);

    List<Product<?>> getAllProducts();
    List<Product<?>> getProductsById(int id);
    void updateProduct(Product<P> product);
    void deleteProduct(int id);
    void addProduct(Product<P> product);
}