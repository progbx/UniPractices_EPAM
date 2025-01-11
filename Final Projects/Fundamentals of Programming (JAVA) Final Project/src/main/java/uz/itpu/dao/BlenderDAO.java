package uz.itpu.dao;

import uz.itpu.models.Blender;
import uz.itpu.models.Product;

import java.util.List;
import java.util.stream.Collectors;

public class BlenderDAO extends CSVProductDAO<Blender> {
    public BlenderDAO(String csvFilePath) {
        super(csvFilePath);
    }

    public List<Blender> getAllBlenders() {
        return super.getAllProducts().stream()
                .map(product -> (Blender) product)
                .collect(Collectors.toList());
    }
}