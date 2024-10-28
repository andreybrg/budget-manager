export const setAuthLocalStorage = (token, id) => {
    localStorage.setItem('Auth.Token', token)
    localStorage.setItem('Auth.User.Id', id)
}