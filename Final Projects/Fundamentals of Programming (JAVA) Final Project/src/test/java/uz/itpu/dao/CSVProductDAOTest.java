package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Iron;
import uz.itpu.models.Product;
import uz.itpu.models.ProductFactory;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CSVProductDAOTest {
    private CSVProductDAO<Iron> csvProductDAO;
    private Product<Iron> testProduct;

    @BeforeEach
    void setUp() {
        csvProductDAO = new CSVProductDAO<>("src/main/resources/Iron.csv");
        testProduct = ProductFactory.createProduct("Iron", 1, "Name", "Category", 100.0, 10);
        csvProductDAO.addProduct(testProduct);
    }

    @Test
    void getAllProducts() {
        List<Product<?>> products = csvProductDAO.getAllProducts();
        assertNotNull(products, "Products list should not be null");
        assertFalse(products.isEmpty(), "Products list should not be empty");
    }

    @Test
    void getProductsById() {
        int testId = 1;
        List<Product<?>> products = csvProductDAO.getProductsById(testId);
        assertNotNull(products, "Products list should not be null");
        assertFalse(products.isEmpty(), "Products list should not be empty");
        assertTrue(products.stream().allMatch(product -> product.getId() == testId), "All products should have the same id");
    }

    @Test
    void updateProduct() {
        testProduct.setName("Updated Name");
        csvProductDAO.updateProduct(testProduct);
        Product<?> updatedProduct = csvProductDAO.getProductsById(testProduct.getId()).get(0);
        assertEquals("Updated Name", updatedProduct.getName(), "Product name should be updated");
    }

    @Test
    void deleteProduct() {
        int testId = 1;
        csvProductDAO.deleteProduct(testId);
        List<Product<?>> products = csvProductDAO.getProductsById(testId);
        assertTrue(products.isEmpty(), "Products list should be empty after deletion");
    }

    @Test
    void addProduct() {
        Product<Iron> newProduct = ProductFactory.createProduct("Iron", 2, "New Name", "New Category", 200.0, 20);
        csvProductDAO.addProduct(newProduct);
        List<Product<?>> products = csvProductDAO.getProductsById(newProduct.getId());
        assertFalse(products.isEmpty(), "Products list should not be empty after addition");
        assertEquals(newProduct, products.get(0), "The added product should be the same as the retrieved product");
    }
}