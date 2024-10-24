import React from "react"
import'./Modals.sass'
import { CenteredModal } from "../../centeredModal"

export const Layout = ({ centeredModal }) => {
    return(
        <>
            <div id='centered-modal'>
                    {centeredModal.modal.isMounted && (
                        <CenteredModal modalTitle={centeredModal.modal.title}>
                            {centeredModal.modal.component}
                        </CenteredModal>
                    )}
            </div>
        </>
    )
}