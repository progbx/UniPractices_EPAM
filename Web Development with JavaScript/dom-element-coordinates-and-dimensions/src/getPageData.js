export function getPageData() {
    const windowWidth = document.documentElement.clientWidth || window.innerWidth;
    const windowHeight = document.documentElement.clientHeight || window.innerHeight;
    const documentWidth = Math.max(
        document.body.scrollWidth, 
        document.documentElement.scrollWidth,
        document.body.offsetWidth, 
        document.documentElement.offsetWidth,
        document.body.clientWidth, 
        document.documentElement.clientWidth
    );
    const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight,
        document.body.clientHeight, 
        document.documentElement.clientHeight
    );
    const currentScrollFromTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const currentScrollFromLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;
    return {
        windowHeight,
        windowWidth,
        documentHeight,
        documentWidth,
        currentScrollFromTop,
        currentScrollFromLeft
    };
}