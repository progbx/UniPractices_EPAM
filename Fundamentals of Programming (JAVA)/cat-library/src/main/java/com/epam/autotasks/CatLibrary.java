package com.epam.autotasks;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class CatLibrary {

    public static final String EMPTY_STRING = "";
    public Map<String, Cat> mapCatsByName(List<Cat> cats) {
        return cats.stream()
                .filter(cat -> cat.getName() != null && !cat.getName().isEmpty())
                .collect(Collectors.toMap(Cat::getName, Function.identity(),
                        (cat1, cat2) -> cat1));
    }
    public Map<Cat.Breed, Set<Cat>> mapCatsByBreed(List<Cat> cats) {
        return cats.stream()
                .filter(cat -> cat.getBreed() != null)
                .collect(Collectors.groupingBy(Cat::getBreed, Collectors.toSet()));
    }
    public Map<Cat.Breed, String> mapCatNamesByBreed(List<Cat> cats) {
        Map<Cat.Breed, List<String>> map = cats.stream()
                .filter(cat -> cat.getBreed() != null && cat.getName() != null && !cat.getName().isEmpty())
                .collect(Collectors.groupingBy(Cat::getBreed,
                        Collectors.mapping(Cat::getName, Collectors.toList())));

        Map<Cat.Breed, String> result = new HashMap<>();
        for (Map.Entry<Cat.Breed, List<String>> entry : map.entrySet()) {
            if (entry.getKey() != null) {
                String names = entry.getValue().stream()
                        .collect(Collectors.joining(", ", "Cat names: ", "."));
                result.put(entry.getKey(), names);
            }
        }
        return result;
    }
    public Map<Cat.Breed, Double> mapAverageResultByBreed(List<Cat> cats) {
        return cats.stream()
                .filter(cat -> cat.getBreed() != null)
                .collect(Collectors.groupingBy(Cat::getBreed,
                        Collectors.averagingDouble(cat -> cat.getContestResult().getSum())));
    }
    public SortedSet<Cat> getOrderedCatsByContestResults(List<Cat> cats) {
        Comparator<Cat> comparator = Comparator.comparing(
                (Cat c) -> c.getContestResult().getSum(),
                Comparator.reverseOrder()
        ).thenComparing(
                Cat::getName,
                Comparator.nullsLast(Comparator.naturalOrder())
        );

        return new TreeSet<>(comparator) {{
            addAll(cats);
        }};
    }
}
