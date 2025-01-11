package uz.itpu.dao;

import org.junit.jupiter.api.Test;
import uz.itpu.models.Blender;
import uz.itpu.models.Iron;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class DAOFactoryTest {

    @Test
    void getProductDAO() {
        DAOFactory factory = DAOFactory.INSTANCE;

        ProductDAO<Blender> blenderDAO = factory.getProductDAO(Blender.class);
        assertNotNull(blenderDAO, "BlenderDAO should not be null");

        ProductDAO<Iron> ironDAO = factory.getProductDAO(Iron.class);
        assertNotNull(ironDAO, "IronDAO should not be null");

    }

    @Test
    void values() {
        DAOFactory[] values = DAOFactory.values();
        assertNotNull(values, "Values should not be null");
        assertEquals(1, values.length, "Values array should have one element");
        assertEquals(DAOFactory.INSTANCE, values[0], "First element of values array should be INSTANCE");
    }

    @Test
    void valueOf() {
        DAOFactory valueOfInstance = DAOFactory.valueOf("INSTANCE");
        assertNotNull(valueOfInstance, "ValueOfInstance should not be null");
        assertEquals(DAOFactory.INSTANCE, valueOfInstance, "ValueOfInstance should be INSTANCE");
    }
}