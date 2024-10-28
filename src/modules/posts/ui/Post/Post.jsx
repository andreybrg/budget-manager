import React, { useContext, useState } from 'react'
import style from './Post.module.sass'
import PostControlSvg from '@assets/images/more_vert.svg'
import PostEditSvg from '@assets/images/edit.svg'
import PostDeleteSvg from '@assets/images/delete.svg'
import { AmountFormatter } from '@shared/utils/amountFormatter'
import { GetCategoryName } from '@shared/utils/getCategoryName'
import cn from 'classnames'
import { ModalsContext } from '@modules/modals'
import { BuiltinPreloader } from '@modules/preloader/builtinPreloader'

export const Post = ({ data, onPostDelete, isFetching, onPostEdit }) => {

    const volume = <AmountFormatter amount={data.volume}/>
    const [ isControlsOpened, setIsControlsOpened ] = useState(false)

    const onControlsToggle = () => {
        setIsControlsOpened(prev => !prev)
    }

    const { confirmationModalController } = useContext(ModalsContext)

    const onDeleteConfirmation = (data) => {
        confirmationModalController.mountConfirmationModal(
            `Действительно хотиет удалить выбранную запись?`, 
            'Удаление записи', 
            () => {
                onControlsToggle()
                onPostDelete(data)
            }, 
            `Удалить запись`
        )
    }



    return(
        <div className={cn(style.post, {[style.isFetching]: isFetching})}>
            <div className={cn(style.content, {[style.controlsOpened]:isControlsOpened})}>
                <div className={style.info}>
                    <div className={style.category}>
                        <GetCategoryName categoryId={data.categoryId}/>
                    </div>

                    {data.title
                    ?
                    <div className={style.title}>
                        {data.title}
                    </div>
                    :
                    null
                    }

                </div>
                <div className={style.volume}>
                    {data.postType === 1
                    ? 
                    <>+ {volume}</>
                    : 
                    <>- {volume}</>
                    }
                </div>

                {
                    !isFetching
                    ?
                    <>
                        <button type={'button'} onClick={() => onControlsToggle()} className={style.controlBtn}>
                            <PostControlSvg/>
                        </button>
                        <div className={style.controls} id={'post-controls'}>
                            <button tabIndex={!isControlsOpened ? "-1" : null} type={'button'} onClick={() => onPostEdit(data, onControlsToggle)} className={style.controlEditBtn}>
                                <PostEditSvg/>
                            </button>
                            <button tabIndex={!isControlsOpened ? "-1" : null} type={'button'} onClick={() => onDeleteConfirmation(data)} className={style.controlDeleteBtn}>
                                <PostDeleteSvg/>
                            </button>
                        </div>
                    </>
                    :
                    <div className={style.preloader}><BuiltinPreloader width={'24px'}/></div>
                }
                
            </div>
        </div>
    )
}