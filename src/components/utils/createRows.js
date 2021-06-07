export const createRows = (data = []) => {
    if (!!!data.length) return

    let rows = []

    data?.forEach((row) => {
        rows.push([row?.companyName, row?.deptName, row?.mapLink])
    })

    return rows
}

export const tableHeaders = [`Company Name`, `Dept. Name`, `Map Link`]
