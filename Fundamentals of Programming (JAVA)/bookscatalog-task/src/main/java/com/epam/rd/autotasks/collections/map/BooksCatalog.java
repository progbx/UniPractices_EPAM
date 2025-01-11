package com.epam.rd.autotasks.collections.map;

import java.util.*;

public class BooksCatalog {
    private static final String EOL = "\n";
    private final Map<Author, List<Book>> catalog;

    public BooksCatalog() {
        this.catalog = new TreeMap<>();
    }

    public BooksCatalog(Map<Author, List<Book>> catalog) {
        this.catalog = new TreeMap<>(catalog);
    }

    /**
     * Returns a List of books of the specified author.
     *
     * @param author the author of books to search for.
     * @return a list of books or {@code null}
     * if there is no such author in the catalog.
     */
    public List<Book> findByAuthor(Author author) {
        if (author == null) throw new NullPointerException();

        for (Map.Entry<Author, List<Book>> entry : catalog.entrySet()) {
            if (entry.getKey().equals(author))
                return entry.getValue();
        }
        return null;
    }

    /**
     * @return the string representation of all authors
     * separated by the current operating system {@code lineSeparator}.
     */
    public String getAllAuthors() {
        boolean end = true;
        StringBuilder builder = new StringBuilder();
        for (Author author : catalog.keySet()) {
            if (end) {
                end = false;
            } else {
                builder.append(EOL);
            }
            builder.append(author.getFirstName()).append(" ").append(author.getLastName());
        }
        return builder.toString();
    }

    /**
     * Searches for pairs of (author, book) by the book title.
     * The pair must be included in the resulting map if the
     * book title contains the specified string matched ignore case.
     * All authors of the book must be specified in the
     * book authors list.
     *
     * @param pattern the string to search for in the book title.
     * @return the map which contains all found books and their authors.
     * It must be sorted by titles of books, if the titles match,
     * by increasing cost.
     */
    public Map<Book, List<Author>> findAuthorsByBookTitle(String pattern) {
        Map<Book, List<Author>> result = new TreeMap<>();
        for (Map.Entry<Author, List<Book>> entry : catalog.entrySet()) {
            for (Book book : entry.getValue()) {
                if (book.getTitle().toLowerCase().contains(pattern.toLowerCase())) {
                    result.putIfAbsent(book, new ArrayList<>());
                    result.get(book).add(entry.getKey());
                }
            }
        }
        return result;
    }

    /**
     * Searches for all books whose genre list contains the specified string.
     * The book must be included in the resulting list if at least
     * one genre of the book contains the specified pattern ignoring case.
     *
     * @param pattern the string to search for in the book genre list.
     * @return an authors list of the found books.
     * @see Book class.
     */
    public Set<Book> findBooksByGenre(String pattern) {

        Objects.requireNonNull(pattern);
        Set<Book> books = new TreeSet<>();

        for (List<Book> bookList : catalog.values()) {
            for (Book book : bookList) {
                for (String bGenre : book.getGenres()) {
                    if (bGenre.toLowerCase().contains(pattern.toLowerCase())
                            || bGenre.regionMatches(true, 0, pattern, 0, pattern.length())) {
                        books.add(book);
                    }
                }
            }
        }
        return books;
    }


    /**
     * Searches for authors of the specified book.
     *
     * @param book the book.
     * @return a list of authors of the specified book.
     * @throws NullPointerException if the parameter is {@code null}
     */
    public List<Author> findAuthorsByBook(Book book) {
        if (book == null) throw new NullPointerException();
        List<Author> authors = new ArrayList<>();
        for (Map.Entry<Author, List<Book>> entry : catalog.entrySet()) {
            if (entry.getValue().contains(book)) {
                authors.add(entry.getKey());
            }
        }
        return authors;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        boolean isEnd = true;
        sb.append("{");
        for (Map.Entry<Author, List<Book>> entry : catalog.entrySet()) {
            if (isEnd) {
                isEnd = false;
            } else {
                sb.append(", ");
            }
            sb.append(entry.getKey());
            sb.append("=");
            sb.append(entry.getValue());

        }
        sb.append("}");
        return sb.toString();
    }
}