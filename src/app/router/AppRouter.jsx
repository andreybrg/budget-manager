import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@app/layout'
import { Authorization } from '@pages/authorizaton'
import { AuthProtectedRoute } from '@shared/routes'

export const AppRouter = ({  }) => {
    return(
        <BrowserRouter>
            <Routes>
                <Route psth={'/'} element={<Layout/>}>
                    <Route index element={
                        <></>
                    }/>
                    <Route path={'panel'} element={
                        <AuthProtectedRoute>
                            <>asdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasdasdasda sdasdas dasdasdasdas dasdasdasd</>
                        </AuthProtectedRoute>
                    }/>
                    <Route path={'auth/:authMode'} element={
                        <AuthProtectedRoute forAuthorizedUser={true}>
                            <Authorization/>
                        </AuthProtectedRoute>
                    }/>
                    <Route path={'*'} element={<>404</>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}