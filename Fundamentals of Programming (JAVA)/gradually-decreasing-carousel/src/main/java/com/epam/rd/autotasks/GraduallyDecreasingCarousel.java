package com.epam.rd.autotasks;

public class GraduallyDecreasingCarousel extends DecrementingCarousel{
    public GraduallyDecreasingCarousel(final int capacity) {
        super(capacity);
    }

    @Override
    public CarouselRun run(){
        //throw new UnsupportedOperationException();
        if (getState() == 1) {
            return null;
        }
        setState((byte) 1);
        return new CarouselRun(getArr(), getI(), 2);
    }
}
