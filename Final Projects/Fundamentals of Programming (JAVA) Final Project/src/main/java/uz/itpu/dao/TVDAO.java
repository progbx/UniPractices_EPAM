package uz.itpu.dao;

import uz.itpu.models.TV;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class TVDAO extends CSVProductDAO<TV> {
    public TVDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<TV> getAllTVs() {
        return super.getAllProducts().stream()
                .map(product -> (TV) product)
                .collect(Collectors.toList());
    }
}