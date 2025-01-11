package com.epam.rd.autotasks.words;

import java.util.Arrays;
import java.util.StringJoiner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {
    public static int countEqualIgnoreCaseAndSpaces(String[] words, String sample) {

        if(words == null || sample == null || sample == "") return  0;
        int countEqualsWord = 0;

        //для кожного слова з words
        for(int i = 0; i < words.length; i ++) {
            //заміна символів пустої строки лишень на початку та кінці
            if(words[i].trim() //replaceAll("\\s*", "")
                    .compareToIgnoreCase(
                            sample.trim()
                    )
                    == 0) countEqualsWord++;
            //System.out.println(words[i].trim().toString());
        }
        //System.out.println(sample);
        return countEqualsWord;
    }

    public static String[] splitWords(String text) {
        if(text == null || text.equals("")) return null;

        Pattern p1 = Pattern.compile("[ ,.;:?!]");
        String[] temp = p1.split(text);

        StringJoiner result = new StringJoiner(",");
        for(String e : temp) if(!e.equals("")) result.add(e);

        if(result.length() == 0) return null;

        String[] resultString = p1.split(result.toString());

        //System.out.println(resultString.length);
        //printString(resultString);

        return resultString;
    }

    public static String convertPath(String path, boolean toWin) {

        if(path == null || path == "") return null;

        String resultPath = null;

        Pattern checkWinPath = Pattern.compile(
                "(^([a-zA-Z]:)?" + //C:\ D:\ F:\
                        "(..)?" +                // ..\
                        "([a-zA-Z]*)?" +         // dir\
                        "\\\\" +
                        "(?:[^\\\\/:*?\"<>|\\r\\n]+\\\\)*" +
                        "[^\\\\/:*?\"<>|\\r\\n]*$)");

        // (^([a-zA-Z]:)?(..)?([a-zA-Z]*)?\\\\(?:[^\\\\/:*?\"<>|\\r\\n]+\\\\)*[^\\\\/:*?\"<>|\\r\\n]*$)");

        Pattern checkUnixPath = Pattern.compile("^~?([^\\\\~]*)$");

        Pattern checkSlashDuplication = Pattern.compile("(?=(/))\\1{2,}"); // найти . (любі) дублікати - (?=(.))\1{2,}

        // ^~?([^\\]*)$

        Matcher unixMatcher = checkUnixPath.matcher(path);
        Matcher winMatcher = checkWinPath.matcher(path);

        Matcher SlashDuplicationMatcher = checkSlashDuplication.matcher(path);
        if(SlashDuplicationMatcher.find()) return null; // перевірка чи не має дублікатів слешів у віндовс шляху

        if(toWin)
        {


            if(unixMatcher.matches()) {
                if (path.startsWith("~")) resultPath = path.replaceFirst("\\~", "C:\\\\User").replaceAll("/", "\\\\");
                else if (path.startsWith("/")) resultPath = path.replaceFirst("/", "C:\\\\").replaceAll("/", "\\\\");
                else resultPath = path.replaceAll("/", "\\\\");
            } else if (winMatcher.matches()) {
                resultPath = path;
            }
        }
        else
        {

            if(winMatcher.matches()) {

                if (path.startsWith("C"))
                    resultPath = path.replaceFirst("C:\\\\User", "~").replaceFirst("C:\\\\", "/").replaceAll("\\\\", "/");
                else resultPath = path.replaceAll("\\\\", "/");
            } else if (unixMatcher.matches()) {
                resultPath = path;
            }
        }
        //System.out.println("Input - " + path + " Result - " + resultPath);
        return resultPath;
    }

    public static String joinWords(String[] words) {
        if(words == null) return null;

        StringJoiner result = new StringJoiner(", ");
        for(String e : words) if(e != "") result.add(e);
        if(result.length() == 0) return null;

        return "["+result.toString()+"]";
    }

    private static void printString(String[] s)
    {
        System.out.println();
        for(String e : s) System.out.print("("+e.toString() + ") ");
        System.out.println();
    }
}
