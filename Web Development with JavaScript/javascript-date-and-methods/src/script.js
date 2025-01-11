export function getFullDaysBeforeNewYear(date, month) {
    if (typeof date !== 'number' || typeof month !== 'number' || 
        date < 1 || month < 1 || month > 12 || isNaN(date) || 
        !isFinite(date) || !isFinite(month)) {
        return null;
    }
    const currentYear = new Date().getFullYear();
    const newYear = new Date(currentYear + 1, 0, 1);
    const startDate = new Date(currentYear, month - 1, date);
    if (startDate >= newYear) {
        return 0; 
    }
    const fullDays = Math.floor((newYear - startDate) / (1000 * 60 * 60 * 24));
    return fullDays;
}

export function formatWithWeekday(date) {
    if (!date) return '';
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdayName = weekdays[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${weekdayName}, ${day}, ${monthName} ${year}`;
}

export function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

export function isAfter(date, dateToCompare) {
    if (!isValidDate(date) || !isValidDate(dateToCompare)) {
        return false;
    }
    return date > dateToCompare;
}

export function formatDistanceToNow(date) {
    if (!date) return 'Date is unknown';
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 30) {
        return 'less than a minute';
    } else if (diffInSeconds < 90) {
        return '1 minute';
    } else if (diffInSeconds < 2700) {
        return `${Math.floor(diffInSeconds / 60)} minutes`;
    } else if (diffInSeconds < 5400) {
        return 'about 1 hour';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}