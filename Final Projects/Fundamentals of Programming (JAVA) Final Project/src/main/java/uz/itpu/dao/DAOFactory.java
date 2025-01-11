package uz.itpu.dao;

import uz.itpu.models.*;

public enum DAOFactory {
    INSTANCE;

    @SuppressWarnings("unchecked")
    public <P extends Product<P>> ProductDAO<P> getProductDAO(Class<P> productClass) {
        if (productClass.equals(Blender.class))
            return (ProductDAO<P>) new BlenderDAO("src/main/resources/Blender.csv");
        if (productClass.equals(Iron.class))
            return (ProductDAO<P>) new IronDAO("src/main/resources/Iron.csv");
        if (productClass.equals(Microwave.class))
            return (ProductDAO<P>) new MicrowaveDAO("src/main/resources/Microwave.csv");
        if (productClass.equals(Oven.class))
            return (ProductDAO<P>) new OvenDAO("src/main/resources/Oven.csv");
        if (productClass.equals(Refrigerator.class))
            return (ProductDAO<P>) new RefrigeratorDAO("src/main/resources/Refrigerator.csv");
        if (productClass.equals(TV.class))
            return (ProductDAO<P>) new TVDAO("src/main/resources/TV.csv");
        if (productClass.equals(Vacuumcleaner.class))
            return (ProductDAO<P>) new VacuumcleanerDAO("src/main/resources/Vacuumcleaner.csv");
        if (productClass.equals(Washingmachine.class))
            return (ProductDAO<P>) new WashingmachineDAO("src/main/resources/Washingmachine.csv");
        return null;
    }
}
