function getClassArray() {
    const task1Container = document.getElementById('task1');
    const elements = task1Container.getElementsByTagName('*');
    const classArray = [];
    for (let element of elements) {
        const classNames = element.className.split(' ');
        if (!classNames.includes('paragraph_hidden')) {
            classArray.push(...classNames.filter(className => className !== ''));
        }
    }
    return [...new Set(classArray)];
}

function addContentToContainer(data) {
    const task2Container = document.getElementById('task2');
    task2Container.innerHTML += data;
}

function removeHiddenParagraphs() {
    const task3Container = document.getElementById('task3');
    const hiddenElements = task3Container.querySelectorAll('[class*="hidden"]');
    const numberOfRemovedItems = hiddenElements.length;
    hiddenElements.forEach(element => {
        element.remove();
    });
    return numberOfRemovedItems;
}

function removeHiddenParagraphs() {
    const task3Container = document.getElementById('task3');
    const hiddenElements = task3Container.querySelectorAll('[class*="hidden"]');
    const numberOfRemovedItems = hiddenElements.length;
    hiddenElements.forEach(element => {
        element.remove();
    });
    return numberOfRemovedItems;
}

function setDataAttr() {
    const task4Container = document.getElementById('task4');
    const elements = task4Container.querySelectorAll('*');
    elements.forEach(element => {
        if (element.children.length > 0) {
            element.setAttribute('data-type', 'container');
        } else {
            element.setAttribute('data-type', 'text');
        }
    });
}