import React from 'react'
import style from './Layout.module.sass'
import { MicroActionBtn } from '@shared/buttons'

export const Layout = ({ filters, postTypeActiveFilter, onChangePostTypeFilter }) => {

    return(
        <div className={style.filters}>
            {filters?.map(el =>
                <MicroActionBtn
                    key={el.id}
                    isActive={postTypeActiveFilter === el.ptId ? true : false}
                    onClick={() => onChangePostTypeFilter(el.ptId)}
                    >
                    {el.name}
                </MicroActionBtn>
            )}
        </div>
    )
}