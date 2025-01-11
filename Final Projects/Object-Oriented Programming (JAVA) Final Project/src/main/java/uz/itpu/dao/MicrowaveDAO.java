package uz.itpu.dao;

import uz.itpu.models.Microwave;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class MicrowaveDAO extends CSVProductDAO<Microwave> {
    public MicrowaveDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Microwave> getAllMicrowaves() {
        return super.getAllProducts().stream()
                .map(product -> (Microwave) product)
                .collect(Collectors.toList());
    }
}