export function getLocalDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
export function getCurrentDateString() {
    return getLocalDateString(new Date())
}
export function getDateObject(localDateString: string) {
    const [year, month, day] = localDateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-based
    return date;
}

export function getMonday(date: Date) {
    const day = date.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = (day === 0 ? -6 : 1) - day; // If Sunday (0), go back 6 days; else subtract day - 1
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0); // reset time to midnight
    return monday;
}

export function getWeekDateStrings(dateString: string) {
    const date = getDateObject(dateString)
    const monday = getMonday(date);
    const weekDateStrings: string[] = []
    for (let i = 0; i < 7; ++i) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i)
        weekDateStrings.push(getLocalDateString(date));
    }
    return weekDateStrings;
}