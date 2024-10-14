// import { useSelector } from "react-redux"

export const withAuth = (Component) => (props) => {

    const isAuth = true

    const ComponentWithAuth = <Component {...props} isAuth={isAuth}/>

    return ComponentWithAuth
}