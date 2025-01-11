function selectionTypes(arr) {
    const obj = {};
    
    arr.forEach(item => {
        const type = typeof item;
        if (!obj[type]) {
            obj[type] = [];
        }
        obj[type].push(item);
    });
    
    return obj;
}

function multiply(x) {
    if (typeof x !== 'number') return 0; // Handle non-number input

    return function(y) {
        if (typeof y !== 'number') return 0; // Handle non-number input
        
        return function(z) {
            if (typeof z !== 'number') return 0; // Handle non-number input
            
            return x * y * z; // Return the product
        };
    };
}

function smartMultiply(x, y) {
    if (typeof x !== 'number' || (y !== undefined && typeof y !== 'number')) return 0; // Handle non-number input

    if (y !== undefined) {
        return x * y; // Return product if both x and y are provided
    }

    return function(y) {
        if (typeof y !== 'number') return 0; // Handle non-number input
        return x * y; // Return product
    };
}

function getNumberOfItems(data) {
    const uniqueItems = new Set();
    
    data.forEach(item => {
        const [str, num] = item;
        if (typeof str === 'string' && str !== '') {
            uniqueItems.add(str);
        }
    });

    return uniqueItems.size; // Return the count of unique strings
}

function createStack() {
    const items = []; // This will be our stack

    return {
        push(item) {
            items.push(item); // Add item to the top of the stack
        },
        pop() {
            return items.pop(); // Remove and return the top item
        },
        peek() {
            return items[items.length - 1]; // Return the top item without removing it
        },
        getStack() {
            return [...items]; // Return a shallow copy of the stack
        },
        get items() {
            return undefined; // Return undefined for stack property
        }
    };
}
