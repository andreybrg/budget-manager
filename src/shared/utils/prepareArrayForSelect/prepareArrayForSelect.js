export const prepareArrayForSelect = (array, labelKey, valueKey) => {
    return array.map(el => ({
        id: el.id,
        label: el[labelKey],
        value: el[valueKey],
    }))
}