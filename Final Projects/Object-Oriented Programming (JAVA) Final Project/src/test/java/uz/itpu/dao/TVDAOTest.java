package uz.itpu.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uz.itpu.models.TV;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TVDAOTest {
    private TVDAO tvDAO;

    @BeforeEach
    void setUp() {
        tvDAO = new TVDAO("src/main/resources/TV.csv");
    }

    @Test
    void getAllTVs() {
        List<TV> tvs = tvDAO.getAllTVs();
        assertNotNull(tvs, "TVs list should not be null");
        assertFalse(tvs.isEmpty(), "TVs list should not be empty");
    }
}