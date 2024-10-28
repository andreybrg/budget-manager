import React from "react"
import'./Modals.sass'
import { CenteredModal } from "../../centeredModal"
import { ConfirmationModal } from "../../confirmationModal"

export const Layout = ({ centeredModal, confirmationModal }) => {
    return(
        <>
            <div id='centered-modal'>
                    {centeredModal.modal.isMounted && (
                        <CenteredModal modalTitle={centeredModal.modal.title}>
                            {centeredModal.modal.component}
                        </CenteredModal>
                    )}
            </div>
            <div id='confirmation-modal'>
                    {confirmationModal.modal.isMounted && (
                        <ConfirmationModal modalTitle={confirmationModal.modal.title} >
                            {confirmationModal.modal.component}
                        </ConfirmationModal>
                    )}
            </div>
        </>
    )
}