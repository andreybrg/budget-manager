import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@app/layout'
import { Authorization } from '@pages/authorizaton'
import { AuthProtectedRoute } from '@shared/routes'
import { FirstSteps } from '@pages/firstSteps'
import { Panel } from '@pages/panel'

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
                            <Panel/>
                        </AuthProtectedRoute>
                    }/>
                    <Route path={'auth/:authMode'} element={
                        <AuthProtectedRoute forAuthorizedUser={true}>
                            <Authorization/>
                        </AuthProtectedRoute>
                    }/>
                    <Route path={'first-steps'} element={
                        <AuthProtectedRoute>
                            <FirstSteps/>
                        </AuthProtectedRoute>
                    }/>
                    <Route path={'*'} element={<>404</>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}