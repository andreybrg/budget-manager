export const dateFormatter = (date) => {

    return new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'})
        .format(new Date(date))
}