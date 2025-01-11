package uz.itpu.view;

import uz.itpu.dao.ProductDAO;
import uz.itpu.models.Product;
import uz.itpu.models.ProductFactory;

import java.util.*;

public class Menu {
    private Map<String, ProductDAO> productDAOs;
    private Scanner scanner = new Scanner(System.in);

    public Menu(Map<String, ProductDAO> productDAOs) {
        this.productDAOs = productDAOs;
    }

    public void run() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("1. Show All Appliance");
            System.out.println("2. Show All Categories");
            System.out.println("3. Search Appliance by ID");
            System.out.println("4. Search Appliance by Name");
            System.out.println("5. Add Appliance");
            System.out.println("6. Update Appliance");
            System.out.println("7. Delete Appliance");
            System.out.println("8. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    // Show All Appliance
                    showApplianceTypes();
                    break;
                case 2:
                    // Show All Categories
                    showAllCategories();
                    break;
                case 3:
                    // Search Appliance by ID
                    searchApplianceByID();
                    break;
                case 4:
                    // Search Appliance by Name
                    searchApplianceByName();
                    break;
                case 5:
                    // Add Appliance
                    addAppliance();
                    break;
                case 6:
                    // Update Appliance
                    updateAppliance();
                    break;
                case 7:
                    // Delete Appliance
                    deleteAppliance();
                    break;
                case 8:
                    // Exit button
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
            System.out.println("01. Main menu");
            System.out.print("Enter your choice: ");
            int mainMenuChoice = scanner.nextInt();
            if (mainMenuChoice != 1) {
                System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private void showApplianceTypes() {
        int i = 1;
        for (String applianceType : productDAOs.keySet()) {
            System.out.println(i + ". " + applianceType);
            i++;
        }
        System.out.print("Enter your choice: ");
        int applianceChoice = scanner.nextInt();
        showAppliancesByType(new ArrayList<>(productDAOs.keySet()).get(applianceChoice - 1));
    }

    private void showAppliancesByType(String applianceType) {
        List<? extends Product> products = productDAOs.get(applianceType).getAllProducts();
        if (products.isEmpty()) {
            System.out.println("Sorry, we don't have any " + applianceType.toLowerCase() + "s available right now.");
        } else {
            for (Product<Product> product : products) {
                if (product.getId() == -1 || product.getQuantity() == -1) {
                    System.out.println("Sorry, we don't have any " + applianceType.toLowerCase() + "s available right now.");
                } else {
                    System.out.println(product);
                }
            }
        }
    }

    private void showAllCategories() {
        Set<String> categories = new HashSet<>();
        for (ProductDAO dao : productDAOs.values()) {
            for (Object obj : dao.getAllProducts()) {
                if (obj instanceof Product) {
                    Product<?> product = (Product<?>) obj;
                    categories.add(product.getCategory());
                }
            }
        }
        int i = 1;
        for (String category : categories) {
            System.out.println(i + ". " + category);
            i++;
        }
        System.out.print("Enter your choice: ");
        int categoryChoice = scanner.nextInt();
        showModelsByCategory(new ArrayList<>(categories).get(categoryChoice - 1));
    }

    private void showModelsByCategory(String category) {
        Set<String> models = new HashSet<>();
        for (Map.Entry<String, ProductDAO> entry : productDAOs.entrySet()) {
            for (Object obj : entry.getValue().getAllProducts()) {
                if (obj instanceof Product) {
                    Product<?> product = (Product<?>) obj;
                    if (product.getCategory().equals(category)) {
                        models.add(entry.getKey());
                    }
                }
            }
        }
        int i = 1;
        for (String model : models) {
            System.out.println(i + ". " + model);
            i++;
        }
        System.out.print("Enter your choice: ");
        int modelChoice = scanner.nextInt();
        showAppliancesByModel(new ArrayList<>(models).get(modelChoice - 1));

    }

    private void showAppliancesByModel(String model) {
        List<? extends Product> products = productDAOs.get(model).getAllProducts();
        if (products.isEmpty()) {
            System.out.println("Sorry, we don't have any " + model.toLowerCase() + "s available right now.");
        } else {
            for (Product<Product> product : products) {
                if (product.getId() == -1 || product.getQuantity() == -1) {
                    System.out.println("Sorry, we don't have any " + model.toLowerCase() + "s available right now.");
                } else {
                    System.out.println(product);
                }
            }
        }
    }

    private void searchApplianceByID() {
        int attempts = 0;
        while (attempts < 5) {
            System.out.print("Enter the ID of product: ");
            int id = scanner.nextInt();
            if (id <= 0) {
                System.out.println("ID should be a positive number.");
                attempts++;
                continue;
            }

            List<Product<Product>> productsWithId = new ArrayList<>();
            for (ProductDAO dao : productDAOs.values()) {
                List<Product<Product>> products = dao.getProductsById(id);
                if (products != null) {
                    productsWithId.addAll(products);
                }
            }

            if (productsWithId.isEmpty()) {
                System.out.println("Sorry there is no such kind of product with this ID");
                attempts++;
                continue;
            }

            for (Product<Product> product : productsWithId) {
                System.out.println(product);
            }
            break;
        }

        if (attempts == 5) {
            System.out.println("Exiting...");
            System.exit(0);
        }
    }

    private void searchApplianceByName() {
        System.out.print("Enter the name of the product: ");
        String name = scanner.next();
        boolean found = false;
        for (ProductDAO dao : productDAOs.values()) {
            for (Object obj : dao.getAllProducts()) {
                if (obj instanceof Product) {
                    Product<?> product = (Product<?>) obj;

                    if (product.getName().equalsIgnoreCase(name)) {
                        System.out.println(product);
                        found = true;
                    }
                }
            }
        }

        if (!found) {
            System.out.println("There is no such kind of product with this name.");
        }
    }

    private void addAppliance() {
        Map<String, String> modelToCategory = new HashMap<>();
        modelToCategory.put("Oven", "Kitchen");
        modelToCategory.put("Microwave", "Kitchen");
        modelToCategory.put("Washingmachine", "Laundry");
        modelToCategory.put("Refrigerator", "Kitchen");
        modelToCategory.put("Iron", "Laundry");
        modelToCategory.put("Vacuumcleaner", "Cleaning");

        System.out.println("Choose which model would you like to add?");
        int i = 1;
        for (String applianceType : productDAOs.keySet()) {
            System.out.println(i + ". " + applianceType);
            i++;
        }
        System.out.print("Enter your choice: ");
        int applianceChoice = scanner.nextInt();
        String chosenModel = new ArrayList<>(productDAOs.keySet()).get(applianceChoice - 1);

        if (chosenModel.equals("TV") || chosenModel.equals("Blender")) {
            System.out.println("Sorry, right now you can't add new appliances for this kind of model");
            return;
        }

        int attempts = 0;
        while (attempts < 5) {
            System.out.print("ID for the product: ");
            int id = scanner.nextInt();
            if (id <= 0) {
                System.out.println("ID should be a positive number.");
                attempts++;
                continue;
            }

            System.out.print("Name for the product: ");
            String name = scanner.next();
            boolean nameExists = productDAOs.get(chosenModel).getAllProducts().stream().anyMatch(product -> ((Product) product).getName().equalsIgnoreCase(name));
            if (nameExists) {
                System.out.println("Product with this name already exists.");
                attempts++;
                continue;
            }

            String category = modelToCategory.get(chosenModel);

            attempts = 0;
            double price = -1;
            while (attempts < 5) {
                System.out.print("Price for the product: ");
                if (scanner.hasNextDouble()) {
                    price = scanner.nextDouble();
                    if (price <= 0) {
                        System.out.println("Price should be a positive number.");
                        attempts++;
                        continue;
                    }
                } else {
                    System.out.println("Price should be a positive number.");
                    attempts++;
                    scanner.next();
                    continue;
                }
                break;
            }

            if (attempts == 5) {
                System.out.println("Exiting...");
                System.exit(0);
            }

            attempts = 0;
            int quantity = -1;
            while (attempts < 5) {
                System.out.print("Quantity for the product: ");
                if (scanner.hasNextInt()) {
                    quantity = scanner.nextInt();
                    if (quantity <= 0) {
                        System.out.println("Quantity should be a positive number.");
                        attempts++;
                        continue;
                    }
                } else {
                    System.out.println("Quantity should be a positive number.");
                    attempts++;
                    scanner.next();
                    continue;
                }
                break;
            }

            if (attempts == 5) {
                System.out.println("Exiting...");
                System.exit(0);
            }

            Product<?> newProduct = ProductFactory.createProduct(chosenModel, id, name, category, price, quantity);
            productDAOs.get(chosenModel).addProduct(newProduct);

            System.out.println("The product has been added successfully!");
            break;
        }

        if (attempts == 5) {
            System.out.println("Exiting...");
            System.exit(0);
        }
    }

    private void updateAppliance() {
        int attempts = 0;
        while (attempts < 5) {
            System.out.print("Enter the ID of the product: ");
            int id = scanner.nextInt();
            if (id <= 0) {
                System.out.println("ID should be a positive number.");
                attempts++;
                continue;
            }

            List<Product<Product>> productsWithId = new ArrayList<>();
            for (ProductDAO dao : productDAOs.values()) {
                List<Product<Product>> products = dao.getProductsById(id);
                if (products != null) {
                    productsWithId.addAll(products);
                }
            }

            if (productsWithId.isEmpty()) {
                System.out.println("Sorry there is no such kind of product with this ID.");
                attempts++;
                continue;
            }

            if (productsWithId.size() > 1) {
                System.out.println("Please choose which one to update:");
                for (int i = 0; i < productsWithId.size(); i++) {
                    System.out.println((i + 1) + ". " + productsWithId.get(i));
                }
                System.out.print("Enter your choice: ");
                int productChoice = scanner.nextInt();
                if (productChoice < 1 || productChoice > productsWithId.size()) {
                    System.out.println("Invalid choice. Returning to the main menu...");
                    return;
                }
                updateProduct(productsWithId.get(productChoice - 1));
            } else {
                updateProduct(productsWithId.get(0));
            }
            break;
        }
        if (attempts == 5) {
            System.out.println("Exiting...");
            System.exit(0);
        }
    }

    private void updateProduct(Product<Product> product) {
        System.out.println("Updating product: " + product);

        System.out.print("Enter the new name for the product: ");
        String newName = scanner.next();
        product.setName(newName);

        System.out.print("Enter the new price for the product: ");
        double newPrice = scanner.nextDouble();
        product.setPrice(newPrice);

        System.out.print("Enter the new quantity for the product: ");
        int newQuantity = scanner.nextInt();
        product.setQuantity(newQuantity);
        productDAOs.get(product.getModel()).updateProduct(product);

        System.out.println("Product updated successfully!");
    }


    private void deleteAppliance() {
        int attempts = 0;
        while (attempts < 5) {
            System.out.print("Enter the ID of product: ");
            int id = scanner.nextInt();
            if (id <= 0) {
                System.out.println("ID should be a positive even number.");
                attempts++;
                continue;
            }

            List<Product<Product>> productsWithId = new ArrayList<>();
            for (ProductDAO dao : productDAOs.values()) {
                List<Product<Product>> products = dao.getProductsById(id);
                if (products != null) {
                    productsWithId.addAll(products);
                }
            }

            if (productsWithId.isEmpty()) {
                System.out.println("No product found with this ID.");
                attempts++;
                continue;
            }

            if (productsWithId.size() == 1) {
                System.out.println("1. " + productsWithId.get(0));
            } else {
                for (int i = 0; i < productsWithId.size(); i++) {
                    System.out.println((i + 1) + ". " + productsWithId.get(i));
                }
            }
            System.out.print("Which product would you like to delete enter the number: ");
            int productChoice = scanner.nextInt();

            if (productChoice >= 1 && productChoice <= productsWithId.size()) {
                confirmAndDeleteProduct(productsWithId.get(productChoice - 1));
                break;
            } else {
                System.out.println("Invalid choice. Please try again.");
            }
        }
        if (attempts == 5) {
            System.out.println("Exiting...");
            System.exit(0);
        }
    }

    private void confirmAndDeleteProduct(Product<Product> product) {
        System.out.println(product);
        System.out.println("Do you want to delete this product?");
        System.out.println("1. Yes");
        System.out.println("2. No");
        int attempts = 0;
        while (attempts < 5) {
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            if (choice == 1) {
                productDAOs.get(product.getModel()).deleteProduct(product.getId());
                System.out.println("The product has been deleted successfully!");
                return;
            } else if (choice == 2) {
                System.out.println("Returning to the main menu...");
                return;
            } else {
                System.out.println("Invalid choice. Please enter 1 or 2.");
                attempts++;
            }
        }
        if (attempts == 5) {
            System.out.println("Invalid choice. Returning to the main menu...");
            return;
        }
    }
}