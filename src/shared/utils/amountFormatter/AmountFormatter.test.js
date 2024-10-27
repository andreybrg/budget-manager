import { render } from '@testing-library/react'
import { AmountFormatter } from './AmountFormatter'
import * as reduxHooks from "react-redux"


jest.mock("react-redux")


const state = {
    auth: {
        data: {
            profileData: {
                currencyId: 1
            }
        }
    },
    app: {
        data: {
            appData: {
                currencies: [
                    {
                    id: 1,
                    name: "Российский рубль",
                    sign: "₽",
                    code: "RUB"
                    },
                    {
                    id: 2,
                    name: "Доллар США",
                    sign: "$",
                    code: "USD"
                    }
                ]
            }
        }
    }
}

describe('AmountFormatter', () => {
    it('Пустой список категорий', () => {
        jest.spyOn(reduxHooks, 'useSelector', '').mockImplementation((callback) => callback(state))
        const component = render(<AmountFormatter amount={10000}/>)
        expect(component).toMatchSnapshot()
    })
    
})