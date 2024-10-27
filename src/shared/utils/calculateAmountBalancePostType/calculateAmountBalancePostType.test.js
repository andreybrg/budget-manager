import { calculateAmountBalancePostType } from "./calculateAmountBalancePostType";

const postList = [
    {
        "userId": 1,
        "postType": 1,
        "categoryId": 2,
        "volume": 4800,
        "title": "Заголовок",
        "date": "2024-10-20",
        "id": 1
      },
      {
        "userId": 4,
        "postType": 1,
        "categoryId": 15,
        "volume": 1500,
        "title": "Заголовок",
        "date": "2024-10-18",
        "id": 2
      },
      {
        "userId": 4,
        "postType": 2,
        "categoryId": 1,
        "volume": 5000,
        "title": "Заголовок",
        "date": "2024-10-26",
        "id": 3
      },
      {
        "userId": 1,
        "postType": 2,
        "categoryId": 14,
        "volume": 200,
        "title": "Заголовок",
        "date": "2024-10-10",
        "id": 4
      }
]

test('Получить отформатированный баланс', () => {
    expect(calculateAmountBalancePostType(postList, 1))
    .toStrictEqual(6300)
})