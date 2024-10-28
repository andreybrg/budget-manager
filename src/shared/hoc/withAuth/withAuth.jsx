import { useSelector } from "react-redux"

export const withAuth = (Component) => (props) => {

    const isAuth = useSelector(store => store.auth.data.isAuth)

    const ComponentWithAuth = <Component {...props} isAuth={isAuth}/>

    return ComponentWithAuth
}