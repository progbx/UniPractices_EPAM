package uz.itpu.view;

import uz.itpu.dao.DAOFactory;
import uz.itpu.dao.ProductDAO;
import uz.itpu.models.*;

import java.util.HashMap;
import java.util.Map;

public class ApplianceManager {
    Map<String, ProductDAO> productDAOs;

    public void run() {
        productDAOs = new HashMap<>();

        productDAOs.put("Blender", DAOFactory.INSTANCE.getProductDAO(Blender.class));
        productDAOs.put("Iron", DAOFactory.INSTANCE.getProductDAO(Iron.class));
        productDAOs.put("Microwave", DAOFactory.INSTANCE.getProductDAO(Microwave.class));
        productDAOs.put("Oven", DAOFactory.INSTANCE.getProductDAO(Oven.class));
        productDAOs.put("Refrigerator", DAOFactory.INSTANCE.getProductDAO(Refrigerator.class));
        productDAOs.put("TV", DAOFactory.INSTANCE.getProductDAO(TV.class));
        productDAOs.put("Vacuumcleaner", DAOFactory.INSTANCE.getProductDAO(Vacuumcleaner.class));
        productDAOs.put("Washingmachine", DAOFactory.INSTANCE.getProductDAO(Washingmachine.class));

        Menu menu = new Menu(productDAOs);
        menu.run();
    }
}