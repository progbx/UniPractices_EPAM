package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Oven;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class OvenDAOTest {
    private OvenDAO ovenDAO;

    @BeforeEach
    void setUp() {
        ovenDAO = new OvenDAO("src/main/resources/Oven.csv");
    }

    @Test
    void getAllOvens() {
        List<Oven> ovens = ovenDAO.getAllOvens();
        assertNotNull(ovens, "Ovens list should not be null");
        assertFalse(ovens.isEmpty(), "Ovens list should not be empty");
    }
}