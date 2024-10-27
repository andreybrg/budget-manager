export const getMonthStartEnd = (date) => {
    const currentDate = new Date(date)
    
    // Определяем начало месяца
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 20);

    // Определяем конец месяца
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 10);

    return {
        monthStart: monthStart.toISOString().split('T')[0],
        monthEnd: monthEnd.toISOString().split('T')[0]
    }
}