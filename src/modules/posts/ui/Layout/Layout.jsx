import React, { useEffect } from 'react'
import cn from 'classnames'
import style from './Layout.module.sass'
import { Post } from '../Post/Post'
import { AmountFormatter } from '@shared/utils/amountFormatter'
import { calculateAmountBalancePostType } from '@shared/utils/calculateAmountBalancePostType'
import { setAddPostBtnShown, unsetAddPostBtnShown } from '@modules/addPost'
import { useDispatch } from 'react-redux'

export const Layout = ({ postList, isFetching, postTypeActiveFilter, onPostDelete, deletingPostsIds, onPostEdit }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const observeElement = document.getElementById('end-post-list')
        const callback = (entries) => {
            entries.forEach(({ isIntersecting }) => {
                if (isIntersecting) {
                    dispatch(setAddPostBtnShown())
                } else {
                    dispatch(unsetAddPostBtnShown())
                }
            })
        }
        
        const observer = new IntersectionObserver(callback)
        observer.observe(observeElement)
    }, [])

    return(
        <div className={cn(style.postList, {[style.postListFetching]: isFetching})}>
            {postTypeActiveFilter === 0
            ?
            <div className={style.sums}>
                <div className={style.sumsItem}>
                    <div className={style.sumsItemTitle}>Доходы</div>
                    <span className={cn({[style.sumsItemFetching]: isFetching})}>+ {<AmountFormatter amount={(calculateAmountBalancePostType(postList, 1))}/>}</span>
                </div>
                <div className={style.sumsItem}>
                    <div className={style.sumsItemTitle}>Расходы</div>
                    <span className={cn({[style.sumsItemFetching]: isFetching})}>- {<AmountFormatter amount={(calculateAmountBalancePostType(postList, 2))}/>}</span>
                </div>
            </div>
            :
            null}

            {
                postList.length
                ?
                postList.map(el =>
                    <Post key={el.id} data={el} onPostDelete={onPostDelete} onPostEdit={onPostEdit} isFetching={deletingPostsIds.includes(el.id)}/>
                )
                :
                <div className={style.emptyPostList}>
                    <div className={style.emptyPostListTitle}>
                        Ничего не найдено
                    </div>
                    <div className={style.emptyPostListUndertitle}>
                        Добавьте новую запись, нажав на «+» справа снизу в панели
                    </div>
                </div>
            }
            <div id={'end-post-list'}></div>
        </div>
    )
}