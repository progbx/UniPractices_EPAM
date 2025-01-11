export function isElementScrolled(element) {
    if (!element) {
        return {
            scrollTop: null,
            scrollLeft: null,
            isScrolled: null,
        };
    }

    const scrollTop = element.scrollTop || 0;
    const scrollLeft = element.scrollLeft || 0;

    let isScrolled = false;
    if (scrollTop > 0 || scrollLeft > 0) {
        isScrolled = true;
    }

    return {
        scrollTop,
        scrollLeft,
        isScrolled,
    };
}
