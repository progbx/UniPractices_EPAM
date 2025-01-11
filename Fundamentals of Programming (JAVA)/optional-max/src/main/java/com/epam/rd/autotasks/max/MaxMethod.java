package com.epam.rd.autotasks.max;

import java.util.Optional;
import java.util.OptionalInt;

public class MaxMethod {
    public static OptionalInt max(int[] values) {

        if(values != null && values.length > 0) {
            int temp = values[0];

            for (int e : values) if (e > temp) temp = e;
            return OptionalInt.of(temp);

        } else return OptionalInt.empty();
    }
}