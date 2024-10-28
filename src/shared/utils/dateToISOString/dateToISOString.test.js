import { dateToISOString } from "./dateToISOString";

test('Получить дату в формате iSO', () => {
    expect(dateToISOString('Sun Sep 01 2024 07:00:00 GMT+0700 (GMT+07:00)'))
    .toStrictEqual('2024-09-01')
})