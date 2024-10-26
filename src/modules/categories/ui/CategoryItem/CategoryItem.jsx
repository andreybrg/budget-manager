import React, { memo, useState } from 'react'
import style from './CategoryItem.module.sass'
import PostEditSvg from '@assets/images/edit.svg?react'
import PostDeleteSvg from '@assets/images/delete.svg?react'
import { CategoryItemForm } from '../CategoryItemForm/CategoryItemForm'
import cn from 'classnames'
import { BuiltinPreloader } from '@modules/preloader/builtinPreloader'

export const CategoryItem = memo(function CategoryItem({ data, isDefaultCategory=false, isFetching, isSuccess, onEditCategory, onDeleteCategory }) {

    const [ isEditMode, setIsEditMode ] = useState(false)
    
    const onEditModeOn = () => {
        setIsEditMode(prev => true)
    }

    const onEditModeOff = () => {
        setIsEditMode(prev => false)
    }

    const onSubmitFunction = (values) => {
        setIsEditMode(false)
        onEditCategory(values)
    }

    const onDeleteCategoryItem = (categoryId, postType) => {
        onDeleteCategory(categoryId, postType)
    }

    return(
        
        <div className={cn(
                    style.item, 
                    {[style.item_fetching]: isFetching},
                    {[style.item_success]: isSuccess}
                )}>
            {!isEditMode
            ?
            <div className={style.content}>

                <div style={{color: data.color}} className={style.title}>
                    {data.name}
                </div>
                {!isDefaultCategory && !isFetching
                ?
                <div className={style.controls}>
                    <button type={'button'} onClick={() => onEditModeOn()} className={style.controlBtn}>
                        <PostEditSvg/>
                    </button>

                    {/* Было решено убрать функционал удаления категории из интерфейса. 
                    Всё из-за невозможности корректно переместить записи в другую категорию после её удаления. 
                    Json server не способен на массовые изменения */}

                    {/* <button type={'button'} onClick={() => onDeleteCategoryItem(data.id, data.postType)} className={style.controlBtn}>
                        <PostDeleteSvg/>
                    </button> */}
                </div>
                :
                null}

                {isFetching
                ?
                <div className={style.preloader}><BuiltinPreloader width={'24px'}/></div>
                : 
                null}
            </div>
            :
            <CategoryItemForm
                onClose={onEditModeOff}
                defaultName={data.name}
                defaultColor={data.color}
                onSubmitFunction={onSubmitFunction}
                categoryId={data.id}
                />
            }
        </div>
    )
})