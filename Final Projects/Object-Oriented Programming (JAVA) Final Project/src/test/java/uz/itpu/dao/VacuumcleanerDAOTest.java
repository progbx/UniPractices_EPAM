package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Vacuumcleaner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class VacuumcleanerDAOTest {
    private VacuumcleanerDAO vacuumcleanerDAO;

    @BeforeEach
    void setUp() {
        vacuumcleanerDAO = new VacuumcleanerDAO("src/main/resources/Vacuumcleaner.csv");
    }

    @Test
    void getAllVacuumcleaners() {
        List<Vacuumcleaner> vacuumcleaners = vacuumcleanerDAO.getAllVacuumcleaners();
        assertNotNull(vacuumcleaners, "Vacuumcleaners list should not be null");
        assertFalse(vacuumcleaners.isEmpty(), "Vacuumcleaners list should not be empty");
    }
}