package uz.itpu.dao;

import uz.itpu.models.Vacuumcleaner;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class VacuumcleanerDAO extends CSVProductDAO<Vacuumcleaner> {
    public VacuumcleanerDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Vacuumcleaner> getAllVacuumcleaners() {
        return super.getAllProducts().stream()
                .map(product -> (Vacuumcleaner) product)
                .collect(Collectors.toList());
    }
}