import React, { useContext } from "react"
import { Layout } from "./Layout"
import { ModalsContext } from "../../context"

export const Container = () => {

    const modalsContextData = useContext(ModalsContext)

    const centeredModal = modalsContextData.centeredModalController
    const confirmationModal = modalsContextData.confirmationModalController

    return(
        <Layout
            centeredModal={centeredModal}
            confirmationModal={confirmationModal}
            />
    )
}