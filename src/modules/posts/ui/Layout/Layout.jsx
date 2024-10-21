import React from 'react'
import style from './Layout.module.sass'
import { Post } from '../Post/Post'
import cn from 'classnames'
import { AmountFormatter } from '@shared/utils/amountFormatter'
import { calculateAmountBalancePostType } from '@shared/utils/calculateAmountBalancePostType'

export const Layout = ({ postList, isFetching, postTypeActiveFilter }) => {

    return(
        <div className={cn(style.postList, {[style.postListFetching]: isFetching})}>
            {postTypeActiveFilter === 0 && !isFetching
            ?
            <div className={style.sums}>
                <div className={style.sumsItem}>
                    <div className={style.sumsItemTitle}>Доходы</div>
                    <span>+ {<AmountFormatter amount={(calculateAmountBalancePostType(postList, 1))}/>}</span>
                </div>
                <div className={style.sumsItem}>
                    <div className={style.sumsItemTitle}>Расходы</div>
                    <span>- {<AmountFormatter amount={(calculateAmountBalancePostType(postList, 2))}/>}</span>
                </div>
            </div>
            :
            null}

            {
                postList.length
                ?
                postList?.map(el =>
                    <Post key={el.id} data={el}/>
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
        </div>
    )
}