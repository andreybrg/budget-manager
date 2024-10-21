export const getWeekStartEnd = (date) => {
    const currentDate = new Date(date)
    
    // Определяем день недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
    const dayOfWeek = currentDate.getDay()

    // Находим начало недели (предполагаем, что неделя начинается с понедельника)
    const startOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const weekStart = new Date(date)
    weekStart.setDate(currentDate.getDate() + startOffset)

    // Находим конец недели (предполагаем, что неделя заканчивается в воскресенье)
    const endOffset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
    const weekEnd = new Date(date)
    weekEnd.setDate(currentDate.getDate() + endOffset)

    return {
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0]
    }
}