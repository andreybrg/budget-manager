import { prepareArrayForSelect } from "./prepareArrayForSelect";

const array = [
    {id: 1, name: 'Имя 1'},
    {id: 2, name: 'Имя 2'},
]

const expectedArray = [
    {
        id: 1,
        label: 1,
        value: 'Имя 1'
    },
    {
        id: 2,
        label: 2,
        value: 'Имя 2'
    },
]


describe('prepareArrayForSelect', () => {
    test('Подготовка списка для селекта', () => {
        expect(prepareArrayForSelect(array, 'id', 'name'))
        .toStrictEqual(expectedArray)
    })
    
    test('Подготовка списка для селекта, пустой массив', () => {
        expect(prepareArrayForSelect([], 'id', 'name'))
        .toStrictEqual([])
    })
})