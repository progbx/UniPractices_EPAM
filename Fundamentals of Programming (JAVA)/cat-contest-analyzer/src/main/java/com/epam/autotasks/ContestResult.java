package com.epam.autotasks;

import lombok.*;

import java.util.Objects;


@Getter
@Setter
public final class ContestResult {

    private final Integer running;
    private final Integer jumping;
    private final Integer purring;
    private final Integer sum;

    public ContestResult(Integer running, Integer jumping, Integer purring) {
        this.running = running;
        this.jumping = jumping;
        this.purring = purring;
        this.sum = countResults(running, jumping, purring);
    }


    public Integer countResults(Integer running, Integer jumping, Integer purring) {
        return running + jumping + purring;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContestResult that = (ContestResult) o;
        return Objects.equals(running, that.running) && Objects.equals(jumping, that.jumping) && Objects.equals(purring, that.purring) && Objects.equals(sum, that.sum);
    }

    @Override
    public String toString() {
        return "ContestResult{" +
                "running=" + running +
                ", jumping=" + jumping +
                ", purring=" + purring +
                ", sum=" + sum +
                '}';
    }

    @Override
    public final int hashCode() {
        return Objects.hash(running, jumping, purring, sum);
    }
}
