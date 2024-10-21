import React from 'react'
import style from './Layout.module.sass'
import { MicroActionBtn } from '@shared/buttons'

export const Layout = ({ filters, postTypeActiveFilter, onChangePostTypeFilter }) => {

    return(
        <div className={style.filters}>
            {filters?.map(el =>
                <MicroActionBtn
                    key={el.id}
                    isActive={postTypeActiveFilter === el.postTypeId ? true : false}
                    onClick={() => onChangePostTypeFilter(el.postTypeId)}
                    >
                    {el.name}
                </MicroActionBtn>
            )}
        </div>
    )
}