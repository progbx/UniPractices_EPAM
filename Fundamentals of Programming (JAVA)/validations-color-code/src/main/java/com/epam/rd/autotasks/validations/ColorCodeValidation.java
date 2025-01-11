package com.epam.rd.autotasks.validations;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ColorCodeValidation {
    public static boolean validateColorCode(String color) {

        if(color == null || color.equals("")) return false;

        Pattern colorPatt = Pattern.compile("^(#){1}" +
                "(?:[a-fA-F0-9]{3}){1,2}" + "$"
        );

        //^(#)?([a-zA-z0-9]{6})([^\\\\/:*?\"<>|\\r\\n])*$
        Matcher m = colorPatt.matcher(color);

        if(m.matches()) return true;

        return false;

    }
}
