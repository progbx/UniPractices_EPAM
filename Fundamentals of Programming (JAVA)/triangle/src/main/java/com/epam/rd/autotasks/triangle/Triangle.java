package com.epam.rd.autotasks.triangle;

class Triangle {
    private Point a, b, c;
    public Triangle(Point a, Point b, Point c) {
        //TODO
        if (isCode(a, b, c)) {
            throw new IllegalArgumentException("The points do not form a valid triangle");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    private boolean isCode(Point a, Point b, Point c) {
        return area(a, b, c) == 0;
    }
    private double area(Point a, Point b, Point c) {
        return Math.abs(0.5 * ((a.getX()*(b.getY()-c.getY())) + (b.getX()*(c.getY()-a.getY())) + (c.getX()*(a.getY()-b.getY()))));
    }

    public double area() {
        //TODO
        return area(a, b, c);
    }

    public Point centroid(){
        //TODO
        double x = (a.getX() + b.getX() + c.getX()) / 3;
        double y = (a.getY() + b.getY() + c.getY()) / 3;
        return new Point(x, y);
    }

}
