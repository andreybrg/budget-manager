import { useSelector } from "react-redux"

export const getCategoryName = (categoryId) => {
    const categories = useSelector(store => store.auth.data.profileData.categories)
    const categoryObj = categories.find(el => el.id === categoryId)
    const categoryName = categoryObj ? categoryObj.name : 'Не найдено'

    return categoryName
}