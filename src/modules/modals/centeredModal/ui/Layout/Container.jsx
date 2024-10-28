import React, { useContext } from "react"
import { Layout } from "./Layout"
import { ModalsContext } from "@modules/modals/context"

export const Container = ({ children, modalTitle }) => {

    const { centeredModalController } = useContext(ModalsContext)

    const closeModal = (e, closedByBtn=false) => {
        if(closedByBtn) {
            centeredModalController.unmountCenteredModal()
        } else {
            if(!e.target.closest('[data-modal="centered-modal-content"]')) {
                centeredModalController.unmountCenteredModal()
            }
        }
    }

    return(
        <Layout
            closeModal={closeModal}
            modalTitle={modalTitle}
            >
            {children}
        </Layout>
    )
}