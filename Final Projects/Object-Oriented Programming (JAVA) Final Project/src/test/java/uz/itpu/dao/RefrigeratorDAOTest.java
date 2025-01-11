package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Refrigerator;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RefrigeratorDAOTest {
    private RefrigeratorDAO refrigeratorDAO;

    @BeforeEach
    void setUp() {
        refrigeratorDAO = new RefrigeratorDAO("src/main/resources/Refrigerator.csv");
    }

    @Test
    void getAllRefrigerators() {
        List<Refrigerator> refrigerators = refrigeratorDAO.getAllRefrigerators();
        assertNotNull(refrigerators, "Refrigerators list should not be null");
        assertFalse(refrigerators.isEmpty(), "Refrigerators list should not be empty");
    }
}