export function isElementVisible(element) {
    if (!element) {
        return false;
    }
    const { offsetWidth, offsetHeight } = element;
    return offsetWidth > 0 || offsetHeight > 0;
}