function getUrlData() {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const queryObject = {};
    queryParams.forEach((value, key) => {
        queryObject[key] = value;
    });
    return {
        fullURL: url.href,
        domain: url.hostname,
        protocol: url.protocol,
        query: queryObject
    };
}

function getQueryParametersValues() {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const values = [];
    queryParams.forEach((value) => {
        values.push(value);
    });
    return values;
}

function setLocalStorageData(data) {
    if (typeof data === 'string' && data !== '') {
        localStorage.setItem('key', data);
        return true;
    }
    return false;
}

function setCookieData(data) {
    if (typeof data === 'string' && data !== '') {
        document.cookie = `${encodeURIComponent(data)}`;
        return true;
    }
    return false;
}
