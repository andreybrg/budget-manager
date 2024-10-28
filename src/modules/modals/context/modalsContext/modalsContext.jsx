import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCenteredModal, unsetCenteredModal } from "../../centeredModal"
import { setConfirmationModal, unsetConfirmationModal } from "../../confirmationModal"

export const ModalsContext = React.createContext()

export const ModalsProvider = ({ children }) => {
    
    const dispatch = useDispatch()

    const [ centeredModalComponent, setCenteredModalComponent ] = useState(null)
    const centeredModalData = useSelector(store => store.centeredModal)
    const { isMounted: centeredModalIsMounted, title: centeredModalTitle } = centeredModalData

    const [ confirmationModalComponent, setConfirmationModalComponent ] = useState(null)
    const [ confirmationModalBtnFunction, setConfirmationModalBtnFunction ] = useState(null)
    const [ confirmationModalBtnText, setConfirmationModalBtnText ] = useState(null)
    const confirmationModalData = useSelector(store => store.confirmationModal)
    const { isMounted: confirmationModalIsMounted, title: confirmationModalTitle } = confirmationModalData

    const centeredModalController = {
        modal: {
            component: centeredModalComponent,
            isMounted: centeredModalIsMounted,
            title: centeredModalTitle
        },
        mountCenteredModal(Component, title) {
            setCenteredModalComponent(Component)
            dispatch(setCenteredModal({title}))
        },
        unmountCenteredModal() {
            setCenteredModalComponent(null)
            dispatch(unsetCenteredModal())
        }
    }

    const confirmationModalController = {
        modal: {
            component: confirmationModalComponent,
            isMounted: confirmationModalIsMounted,
            title: confirmationModalTitle,
            btnFunction: confirmationModalBtnFunction,
            btnText: confirmationModalBtnText
        },
        mountConfirmationModal(text, title, callback, btnText) {
            setConfirmationModalBtnFunction(() => () => callback())
            setConfirmationModalComponent(text)
            setConfirmationModalBtnText(btnText)
            dispatch(setConfirmationModal({title}))
        },
        unmountConfirmationModal() {
            setConfirmationModalComponent(null)
            dispatch(unsetConfirmationModal())
        }
    }

    return(
        <ModalsContext.Provider value={{centeredModalController, confirmationModalController}}>
            {children}
        </ModalsContext.Provider>
    )
}