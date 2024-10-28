import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Layout } from './../ui/Layout/Layout'

test('PanelTitle', () => {
    render(<Layout children={'Заголовок'}/>)
    const amountFormatted = screen.getByText(/заголовок/i)
    expect(amountFormatted).toBeInTheDocument()
})