import React, { useContext } from "react"
import { Layout } from "./Layout"
import { ModalsContext } from "../../context"

export const Container = () => {

    const modalsContextData = useContext(ModalsContext)

    const mainModal = modalsContextData.mainModalController
    const centeredModal = modalsContextData.centeredModalController

    return(
        <Layout
            mainModal={mainModal}
            centeredModal={centeredModal}
            />
    )
}