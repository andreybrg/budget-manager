export const getAuthLocalStorage = () => {
    const token = localStorage.getItem('Auth.Token')
    const id = localStorage.getItem('Auth.User.Id')
    return [token,id]
}