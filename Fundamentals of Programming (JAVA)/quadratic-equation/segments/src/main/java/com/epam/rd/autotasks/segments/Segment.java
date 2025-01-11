package com.epam.rd.autotasks.segments;


class Segment {
    final Point start;
    final Point end;
    public Segment(Point start, Point end) {
        if (start.getX() == end.getX() && start.getY() == end.getY()) {
            throw new IllegalArgumentException("Start and end points cannot be the same");
        }
        this.start = start;
        this.end = end;
    }

    double length() {
        return Math.sqrt(Math.pow(end.getX() - start.getX(), 2) + Math.pow(end.getY() - start.getY(), 2));
    }

    Point middle() {
        return new Point((start.getX() + end.getX()) / 2, (start.getY() + end.getY()) / 2);
    }

    Point intersection(Segment another) {
        double x1 = start.getX(), y1 = start.getY(), x2 = end.getX(), y2 = end.getY();
        double x3 = another.start.getX(), y3 = another.start.getY(), x4 = another.end.getX(), y4 = another.end.getY();

        double d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (d == 0) return null;  // lines are parallel or coincident

        double xi = ((x3 - x4) * (x1 * y2 - y1 * x2) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d;
        double yi = ((y3 - y4) * (x1 * y2 - y1 * x2) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d;

        Point p = new Point(xi, yi);
        if (xi < Math.min(x1, x2) || xi > Math.max(x1, x2) || xi < Math.min(x3, x4) || xi > Math.max(x3, x4)) {
            return null;  // intersection point is not on the segments
        }
        return p;
    }

}
