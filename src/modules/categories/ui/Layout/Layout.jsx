import React from 'react'
import style from './Layout.module.sass'
import { PanelTitle } from '@shared/titles'
import { MicroActionBtn, SimpleBtn } from '@shared/buttons'
import { CategoryItem } from '../CategoryItem/CategoryItem'
import AddSvg from '@assets/images/add.svg?react'
import { CategoryItemForm } from '../CategoryItemForm/CategoryItemForm'

export const Layout = ({ 
    categories,
    customCategories,
    postTypeShown, 
    onSetCategoryIdShown, 
    postTypes,
    addCategoryMode,
    onToggleAddCategoryMode,
    onAddNewCategory,
}) => {

    return(
        <div className={style.categoriesContent}>
            <PanelTitle>
                Управление категориями
            </PanelTitle>
            <div className={style.filters}>
                {postTypes?.map(el =>
                    <MicroActionBtn
                        key={el.id}
                        isActive={postTypeShown === el.id ? true : false}
                        onClick={() => onSetCategoryIdShown(el.id)}
                        >
                        Категории для «{el.name}»
                    </MicroActionBtn>
                )}
            </div>
            <div className={style.categoriesList}>
                
                <div className={style.addArea}>
                    {!addCategoryMode
                        ?
                        <SimpleBtn svgComponent={<AddSvg/>} onClick={() => onToggleAddCategoryMode()}>
                            Дбавить категорию
                        </SimpleBtn>
                        :
                        <CategoryItemForm
                            onClose={onToggleAddCategoryMode}
                            onSubmit={onAddNewCategory}
                            />
                    }
                </div>
                
                {customCategories?.map(el =>
                    el.postType === postTypeShown
                        ?
                        <CategoryItem key={el.id} data={el}/>
                        :
                        false
                )}
                
                {categories?.map(el =>
                    el.postType === postTypeShown
                        ?
                        <CategoryItem key={el.id} data={el} isDefaultCategory={true}/>
                        :
                        false
                )}
            </div>
        </div>
    )
}