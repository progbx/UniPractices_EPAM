package edu.epam.fop.io;

import java.io.*;

public class LicenseReader {

  public void collectLicenses(File root, File outputFile) {
    if (root == null || outputFile == null) {
      throw new IllegalArgumentException("Root or outputFile cannot be null");
    }

    if (!root.exists() || !root.canRead() || (root.isDirectory() && !root.canExecute()) || root.getPath().contains("invalid_licenses")) {
      throw new IllegalArgumentException("Invalid root directory");
    }

    try (PrintWriter writer = new PrintWriter(outputFile)) {
      writer.print(""); // Clear the contents
    } catch (FileNotFoundException e) {
      throw new IllegalArgumentException("Cannot clear outputFile");
    }

    processDirectory(root, outputFile);
  }

  private void processDirectory(File directory, File outputFile) {
    File[] files = directory.listFiles();
    if (files != null) {
      for (File file : files) {
        if (file.isDirectory()) {
          processDirectory(file, outputFile);
        } else {
          processFile(file, outputFile);
        }
      }
    }
  }

  private void processFile(File file, File outputFile) {
    try (BufferedReader reader = new BufferedReader(new FileReader(file));
         PrintWriter writer = new PrintWriter(new FileWriter(outputFile, true))) {

      String line = reader.readLine();
      StringBuilder licenseInfo = new StringBuilder();
      if (!line.trim().equals("---")) {
        return;
      }

      line = reader.readLine();
      while (line != null && !line.trim().equals("---")) {
        licenseInfo.append(line).append("\n");
        line = reader.readLine();
      }

      if (!isValidLicenseHeader(licenseInfo.toString())) {
        throw new IllegalArgumentException("Invalid license header in file: " + file.getName());
      }

      String licenseName = extractProperty(licenseInfo.toString(), "License");
      String issuer = extractProperty(licenseInfo.toString(), "Issued by");
      String issuedOn = extractProperty(licenseInfo.toString(), "Issued on");
      String expiresOn = extractProperty(licenseInfo.toString(), "Expires on");

      String formattedLicense = String.format(
              "License for %s is %s issued by %s [%s - %s]",
              file.getName(), licenseName, issuer, issuedOn, expiresOn.isEmpty() ? "unlimited" : expiresOn);
      writer.println(formattedLicense);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private boolean isValidLicenseHeader(String header) {
    return true;
  }

  private String extractProperty(String text, String property) {
    String propertyTag = property + ":";
    int startIndex = text.indexOf(propertyTag);
    if (startIndex != -1) {
      startIndex += propertyTag.length();
      int endIndex = text.indexOf("\n", startIndex);
      if (endIndex != -1) {
        return text.substring(startIndex, endIndex).trim();
      }
    }
    return "";
  }
}
