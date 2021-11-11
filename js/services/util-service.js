export const utilService = {
    saveToStorage,
    loadFromStorage,
    formatDate
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}
function formatDate(timestamp) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // prettier-ignore
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December'];
    const date = new Date(timestamp);
    const time = _formatTime(date.getHours()) + ':' + _formatTime(date.getMinutes());
    const currTimestamp = Date.now();
    const currDate = new Date(currTimestamp);
    const day = 1000 * 60 * 60 * 24;
    if (currTimestamp - timestamp < day) return 'Today ' + time;
    if (currTimestamp - timestamp < day * 2) return 'Yesterday ' + time;
    if (currTimestamp - timestamp < day * 7) return days[date.getDay()];
    if (currDate.getFullYear() !== date.getFullYear())
      return months[date.getMonth()].slice(0, 3) + ' ' + date.getFullYear();
    return date.getDate() + ' ' + months[date.getMonth()].slice(0, 3);
  }