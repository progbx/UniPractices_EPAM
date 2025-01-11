export function getTimeBetween(date_1, date_2, unit) {
    if (unit === 'days') {
        return dateFns.differenceInDays(date_2, date_1);
    } else if (unit === 'hours') {
        return dateFns.differenceInHours(date_2, date_1);
    } else if (unit === 'minutes') {
        return dateFns.differenceInMinutes(date_2, date_1);
    } else {
        return "Invalid unit specified. Must be 'days', 'hours', or 'minutes'";
    }
}