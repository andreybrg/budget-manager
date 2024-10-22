import { useSelector } from "react-redux"

export const GetCategoryName = ({categoryId}) => {
    const categories = useSelector(store => store.auth.data.profileData.categories)
    const categoryObj = categories ? categories.find(el => el.id === categoryId) : null
    const categoryName = categoryObj ? categoryObj.name : 'Не найдено'
    const categoryColor = categoryObj ? categoryObj.color : 'inherit'

    return <span style={{color: categoryColor}}>{categoryName}</span>
}