package com.epam.autotasks.collections;

import java.util.*;

class RangedOpsIntegerSet extends AbstractSet<Integer> {

    private final Set<Integer> list = new TreeSet<>();

    public boolean add(int fromInclusive, int toExclusive) {
        boolean modified = false;
        for (int i = fromInclusive; i < toExclusive; i++) {
            modified |= list.add(i);
        }
        return modified;
    }


    public boolean remove(int fromInclusive, int toExclusive) {
        boolean modified = false;
        for (int i = fromInclusive; i < toExclusive; i++) {
            modified |= list.remove(i);
        }
        return modified;

    }


    @Override
    public boolean add(final Integer integer) {
        if (! list.contains(integer)) {
            list.add(integer);
            return true;
        }
        return false;
    }

    @Override
    public boolean remove(final Object o) {
        Objects.requireNonNull(o);
        if (list.contains((Integer) o)) {
            list.remove(o);
            return true;
        }
        return false;
    }

    @Override
    public Iterator<Integer> iterator() {
        return list.iterator();
    }

    @Override
    public int size() {
        return list.size();

    }
}