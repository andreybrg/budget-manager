import { render } from '@testing-library/react'
import { GetCategoryName } from './GetCategoryName'
import * as reduxHooks from "react-redux"

const categories = [
        {
            id: 1,
            name: 'Имя категории',
            color: '#FFFFFF',
        }
    ]

jest.mock("react-redux")

describe('GetCategoryName', () => {
    it('Пустой список категорий', () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([])
        const component = render(<GetCategoryName categoryId={1}/>)
        expect(component).toMatchSnapshot()
    })
    it('Получен список категорий из стора', () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(categories)
        const component = render(<GetCategoryName categoryId={1}/>)
        expect(component).toMatchSnapshot()
    })
})