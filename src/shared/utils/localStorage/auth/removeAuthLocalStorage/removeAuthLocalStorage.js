export const removeAuthLocalStorage = () => {
    localStorage.removeItem('Auth.Token')
    localStorage.removeItem('Auth.User.Id')
}