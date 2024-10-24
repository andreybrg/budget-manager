import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCenteredModal, unsetCenteredModal } from "../../centeredModal"

export const ModalsContext = React.createContext()

export const ModalsProvider = ({ children }) => {
    
    const dispatch = useDispatch()

    const [ centeredModalComponent, setCenteredModalComponent ] = useState(null)
    const centeredModalData = useSelector(store => store.centeredModal)
    const { isMounted: centeredModalIsMounted, title: centeredModalTitle } = centeredModalData

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

    return(
        <ModalsContext.Provider value={{centeredModalController}}>
            {children}
        </ModalsContext.Provider>
    )
}