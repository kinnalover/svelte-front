export function formatDateTime(datetime) {
    if (!datetime) return 'Н/Д'; // Handle null or undefined dates with "Н/Д" (Not Available)
    const date = new Date(datetime);
    return date.toLocaleString('ru-RU', { 
        // year: 'numeric', 
        // month: 'long', 
        // day: 'numeric', ;
        // hour: '2-digit', 
        // minute: '2-digit', 
        // second: '2-digit',
        // hour12: false  // 24-hour format
    });
}