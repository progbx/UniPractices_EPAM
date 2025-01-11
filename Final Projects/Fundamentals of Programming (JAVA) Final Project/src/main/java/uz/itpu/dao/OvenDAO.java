package uz.itpu.dao;

import uz.itpu.models.Oven;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class OvenDAO extends CSVProductDAO<Oven> {
    public OvenDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Oven> getAllOvens() {
        return super.getAllProducts().stream()
                .map(product -> (Oven) product)
                .collect(Collectors.toList());
    }
}
