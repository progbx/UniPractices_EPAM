package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.Microwave;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MicrowaveDAOTest {
    private MicrowaveDAO microwaveDAO;

    @BeforeEach
    void setUp() {
        microwaveDAO = new MicrowaveDAO("src/main/resources/Microwave.csv");
    }

    @Test
    void getAllMicrowaves() {
        List<Microwave> microwaves = microwaveDAO.getAllMicrowaves();
        assertNotNull(microwaves, "Microwaves list should not be null");
        assertFalse(microwaves.isEmpty(), "Microwaves list should not be empty");
    }
}