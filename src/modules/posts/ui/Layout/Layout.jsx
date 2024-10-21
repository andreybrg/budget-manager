import React from 'react'
import style from './Layout.module.sass'
import { Post } from '../Post/Post'
import { useSelector } from 'react-redux'

export const Layout = ({ data }) => {

    console.log(data)

    return(
        <div className={style.postList}>
            {
                data.length
                ?
                data?.map(el =>
                    <Post key={el.id} data={el}/>
                )
                :
                'Ничего не найдено'
            }
        </div>
    )
}