package uz.itpu.dao;

import uz.itpu.models.Refrigerator;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class RefrigeratorDAO extends CSVProductDAO<Refrigerator> {
    public RefrigeratorDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Refrigerator> getAllRefrigerators() {
        return super.getAllProducts().stream()
                .map(product -> (Refrigerator) product)
                .collect(Collectors.toList());
    }
}