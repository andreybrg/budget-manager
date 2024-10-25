import React, { useContext } from "react"
import { Layout } from "./Layout"
import { ModalsContext } from "@modules/modals/context"

export const Container = ({ children, modalTitle }) => {

    const { confirmationModalController } = useContext(ModalsContext)

    const closeModal = (e, closedByBtn=false) => {
        if(closedByBtn) {
            confirmationModalController.unmountConfirmationModal()
        } else {
            if(!e.target.closest('[data-modal="confirmation-modal-content"]')) {
                confirmationModalController.unmountConfirmationModal()
            }
        }
    }

    const onButtonClick = (e) => {
        closeModal(e, true)
        confirmationModalController.modal.btnFunction()
    }

    return(
        <Layout
            closeModal={closeModal}
            modalTitle={modalTitle}
            onButtonClick={onButtonClick}
            buttonText={confirmationModalController.modal.btnText}
            >
            {children}
        </Layout>
    )
}