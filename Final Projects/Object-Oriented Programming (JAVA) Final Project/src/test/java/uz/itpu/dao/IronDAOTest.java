package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Iron;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class IronDAOTest {
    private IronDAO ironDAO;

    @BeforeEach
    void setUp() {
        ironDAO = new IronDAO("src/main/resources/Iron.csv");
    }

    @Test
    void getAllIrons() {
        List<Iron> irons = ironDAO.getAllIrons();
        assertNotNull(irons, "Irons list should not be null");
        assertFalse(irons.isEmpty(), "Irons list should not be empty");
    }
}