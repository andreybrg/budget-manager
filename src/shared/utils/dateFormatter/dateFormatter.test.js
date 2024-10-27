import { dateFormatter } from "./dateFormatter";

test('Получить отформатированную дату', () => {
    expect(dateFormatter('2024-09-01'))
    .toStrictEqual('01.09.2024')
})