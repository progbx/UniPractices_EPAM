package com.epam.rd.autotasks;

import java.util.Arrays;
import java.util.Optional;

public enum Direction {
    N(0), NE(45), E(90), SE(135), S(180), SW(225), W(270), NW(315);

    private int degrees;
    Direction(final int degrees) {
        this.degrees = degrees;
    }

    private static int inRange(int degrees){
        while (degrees < 0) degrees += 360;
        return degrees % 360;
    }

    public static Direction ofDegrees(int degrees) {
        degrees = inRange(degrees);
        for (Direction direction:
                Direction.values()) {
            if (direction.degrees == degrees)
                return direction;
        }
        return null;
    }

    /**/
    public static Direction closestToDegrees(int degrees) {
        degrees = inRange(degrees);
        // 0 - N 45 - NE -> 44/2 = 22 -> <22-N >22-NE
        if (degrees < 23) return N;
        if (degrees < 67) return NE;
        if (degrees < 112) return E;
        if (degrees < 157) return  SE;
        if (degrees < 202) return S;
        if (degrees < 247) return SW;
        if (degrees < 292) return W;
        if (degrees < 337) return NW;
        return N;
    }

    public Direction opposite() {
        switch (this) {
            case N: return S;
            case NE: return SW;
            case E: return W;
            case SE: return NW;
            case S: return N;
            case SW: return NE;
            case W: return E;
            case NW: return SE;
        }
        return null;
    }

    public int differenceDegreesTo(Direction direction) {

        int difference = Math.abs(this.degrees - direction.degrees);
        return Math.min(difference, 360 - difference);
    }
}
