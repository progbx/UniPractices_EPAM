package uz.itpu.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProductFactoryTest {

    @Test
    void createProduct() {
        Product product = ProductFactory.createProduct("blender", 1, "Blender1", "Kitchen", 100.0, 10);
        assertInstanceOf(Blender.class, product);
        assertEquals(1, product.getId());
        assertEquals("Blender1", product.getName());
        assertEquals("Kitchen", product.getCategory());
        assertEquals(100.0, product.getPrice());
        assertEquals(10, product.getQuantity());
    }
}