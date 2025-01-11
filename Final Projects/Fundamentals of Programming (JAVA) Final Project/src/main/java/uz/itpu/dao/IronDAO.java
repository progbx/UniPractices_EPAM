package uz.itpu.dao;

import uz.itpu.models.Iron;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class IronDAO extends CSVProductDAO<Iron> {
    public IronDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Iron> getAllIrons() {
        return super.getAllProducts().stream()
                .map(product -> (Iron) product)
                .collect(Collectors.toList());
    }
}