import { getWeekStartEnd } from "./getWeekStartEnd";

describe('getWeekStartEnd', () => {
    test('Получить начало и конец текущей недели', () => {
        expect(getWeekStartEnd('2024-10-27'))
        .toStrictEqual({
            weekStart: '2024-10-21',
            weekEnd: '2024-10-27'
        })
    })
    
    test('Получить начало и конец текущей недели', () => {
        expect(getWeekStartEnd('2024-10-21'))
        .toStrictEqual({
            weekStart: '2024-10-21',
            weekEnd: '2024-10-27'
        })
    })
    
    test('Получить начало и конец текущей недели', () => {
        expect(getWeekStartEnd('2024-10-24'))
        .toStrictEqual({
            weekStart: '2024-10-21',
            weekEnd: '2024-10-27'
        })
    })
})