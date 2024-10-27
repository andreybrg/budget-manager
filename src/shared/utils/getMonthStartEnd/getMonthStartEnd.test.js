import { getMonthStartEnd } from "./getMonthStartEnd";

describe('getMonthStartEnd', () => {
    test('Получить начало и конец текущего месяца', () => {
        expect(getMonthStartEnd('2024-09-30'))
        .toStrictEqual({
            monthStart: '2024-09-01',
            monthEnd: '2024-09-30'
        })
    })
    
    test('Получить начало и конец текущего месяца', () => {
        expect(getMonthStartEnd('2024-09-01'))
        .toStrictEqual({
            monthStart: '2024-09-01',
            monthEnd: '2024-09-30'
        })
    })
    
    test('Получить начало и конец текущего месяца', () => {
        expect(getMonthStartEnd('2024-09-15'))
        .toStrictEqual({
            monthStart: '2024-09-01',
            monthEnd: '2024-09-30'
        })
    })
})