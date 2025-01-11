package uz.itpu.dao;

import uz.itpu.models.Washingmachine;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class WashingmachineDAO extends CSVProductDAO<Washingmachine> {
    public WashingmachineDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Washingmachine> getAllWashingmachines() {
        return super.getAllProducts().stream()
                .map(product -> (Washingmachine) product)
                .collect(Collectors.toList());
    }
}