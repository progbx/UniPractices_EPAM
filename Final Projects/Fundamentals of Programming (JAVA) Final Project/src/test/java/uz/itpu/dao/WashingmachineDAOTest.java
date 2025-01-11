package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Washingmachine;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class WashingmachineDAOTest {
    private WashingmachineDAO washingmachineDAO;

    @BeforeEach
    void setUp() {
        washingmachineDAO = new WashingmachineDAO("src/main/resources/Washingmachine.csv");
    }

    @Test
    void getAllWashingmachines() {
        List<Washingmachine> washingmachines = washingmachineDAO.getAllWashingmachines();
        assertNotNull(washingmachines, "Washingmachines list should not be null");
        assertFalse(washingmachines.isEmpty(), "Washingmachines list should not be empty");
    }
}