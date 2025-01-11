package uz.itpu.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProductTest {
    Product<?> product;

    @BeforeEach
    void setUp() {
        product = ProductFactory.createProduct("Iron", 1, "Rowenta", "Laundry", 500.0, 30);
    }

    @Test
    void getModel() {
        String expected = "Iron";
        String actual = product.getModel();
        assertEquals(expected, actual);
    }

    @Test
    void getId() {
        int expected = 1;
        int actual = product.getId();
        assertEquals(expected, actual);
    }

    @Test
    void getName() {
        String expected = "Rowenta";
        String actual = product.getName();
        assertEquals(expected, actual);
    }

    @Test
    void getCategory() {
        String expected = "Laundry";
        String actual = product.getCategory();
        assertEquals(expected, actual);
    }

    @Test
    void getPrice() {
        double expected = 500.0;
        double actual = product.getPrice();
        assertEquals(expected, actual);
    }

    @Test
    void getQuantity() {
        int expected = 30;
        int actual = product.getQuantity();
        assertEquals(expected, actual);
    }

    @Test
    void setId() {
        int expected = 2;
        product.setId(2);
        int actual = product.getId();
        assertEquals(expected, actual);
    }

    @Test
    void setName() {
        String expected = "Bosch";
        product.setName("Bosch");
        String actual = product.getName();
        assertEquals(expected, actual);
    }

    @Test
    void setCategory() {
        String expected = "Kitchen";
        product.setCategory("Kitchen");
        String actual = product.getCategory();
        assertEquals(expected, actual);
    }

    @Test
    void setPrice() {
        double expected = 600.0;
        product.setPrice(600.0);
        double actual = product.getPrice();
        assertEquals(expected, actual);
    }

    @Test
    void setQuantity() {
        int expected = 40;
        product.setQuantity(40);
        int actual = product.getQuantity();
        assertEquals(expected, actual);
    }

    @Test
    void testToString() {
        String expected = "Iron. ID: 1, Name: Rowenta, Category: Laundry, Price: 500.0, Quantity: 30";
        String actual = product.toString();
        assertEquals(expected, actual);
    }
}