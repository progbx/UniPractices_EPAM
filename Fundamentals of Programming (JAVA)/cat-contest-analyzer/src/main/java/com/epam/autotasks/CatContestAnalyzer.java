package com.epam.autotasks;

import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class CatContestAnalyzer {

    public static final Integer DEFAULT_VALUE = -1;

    public Integer getMaxResult(List<Cat> cats) {
        Integer integer = cats.stream().map(this::getSum).max(Integer::compareTo).orElse(0);
        if (integer == 0) return -1;
        return integer;
    }

    public Integer getMinResult(List<Cat> cats) {
        Integer integer = cats.stream().map(this::getSum).filter(n -> n > 0).min(Integer::compareTo).orElse(0);
        if (integer == 0) return -1;
        return integer;
    }

    public OptionalDouble getAverageResultByBreed(List<Cat> cats, Cat.Breed breed) {
        return cats.stream().filter(cat -> Objects.nonNull(cat.getBreed()) && Objects.nonNull(breed) && cat.getBreed().equals(breed)).map(this::getSum).flatMapToInt(IntStream::of).average();
    }

    public Optional<Cat> getWinner(List<Cat> cats) {
        return cats.stream().sorted((o1, o2) -> getSum(o2).compareTo(getSum(o1))).limit(1).findFirst();
    }

    private Integer getSum(Cat cat) {
        ContestResult contestResult = cat.getContestResult();
        return contestResult.getPurring() + contestResult.getRunning() + contestResult.getJumping();
    }

    public List<Cat> getThreeLeaders(List<Cat> cats) {
        return cats.stream().sorted((o1, o2) -> getSum(o2).compareTo(getSum(o1))).limit(3).toList();

    }

    public boolean validateResultSumNotNull(List<Cat> cats) {
        return cats.stream().filter(cat -> getSum(cat) > 0).toList().size() == cats.size();
    }

    public boolean validateAllResultsSet(List<Cat> cats) {
        return cats.stream().allMatch(cat -> {
            ContestResult contestResult = cat.getContestResult();
            return contestResult.getJumping() != 0 && contestResult.getRunning() != 0 && contestResult.getPurring() != 0;
        });
    }

    public Optional<Cat> findAnyWithAboveAverageResultByBreed(List<Cat> cats, Cat.Breed breed) {
        OptionalDouble average = cats.stream().flatMapToInt(cat1 -> IntStream.of(getSum(cat1))).average();
        return cats.stream().filter(cat -> Objects.nonNull(cat.getBreed()) && Objects.nonNull(breed) && breed.equals(cat.getBreed()) && average.orElse(0) < getSum(cat)).findAny();
    }
}
