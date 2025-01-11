package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Blender;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class BlenderDAOTest {
    BlenderDAO blenderDAO;

    @BeforeEach
    void setUp() {
        blenderDAO = new BlenderDAO("src/main/resources/Blender.csv");
    }

    @Test
    void getAllBlenders() {
        List<Blender> blenders = blenderDAO.getAllBlenders();
        assertNotNull(blenders, "The list of blenders should not be null");
        assertFalse(blenders.isEmpty(), "The list of blenders should not be empty");
    }
}