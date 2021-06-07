export const structureData = (verified, companyData, unVerifiedData) => {
    if (!!!companyData) return
    if (!verified && !!!unVerifiedData) return

    let newData = []

    let data = verified ? { ...companyData } : { ...unVerifiedData }

    Object.keys(data).forEach((el) => {
        // el => comp ID
        if (verified && !!!data[el]?.department) return

        Object.keys(verified ? data[el]?.department : data[el])?.forEach(
            (item) => {
                // item => deptId
                newData.push({
                    companyId: el,

                    companyDesc: verified
                        ? data?.[el]?.desc
                        : companyData?.[el]?.desc,

                    mobile: verified
                        ? data[el]?.mobNo
                        : companyData?.[el]?.mobNo,

                    email: verified
                        ? data[el]?.uname
                        : companyData?.[el]?.uname,

                    companyName: verified
                        ? data[el]?.company
                        : companyData?.[el]?.company,

                    mapLink: verified
                        ? data[el]?.mapLink
                        : companyData?.[el]?.mapLink,

                    deptId: item,

                    deptName: verified
                        ? data[el]?.department?.[item]?.name
                        : data[el]?.[item]?.name,

                    deptDescription: verified
                        ? data[el]?.department?.[item]?.descript
                        : data[el]?.[item]?.descript,

                    startingTime: verified
                        ? data[el]?.department?.[item]?.st
                        : data[el]?.[item]?.st,

                    endingTime: verified
                        ? data[el]?.department?.[item]?.et
                        : data[el]?.[item]?.et,

                    verifiedBy: verified
                        ? data[el]?.department?.[item]?.verifiedBy
                        : '',

                    verifiedAt: verified
                        ? data[el]?.department?.[item]?.verifiedAt
                        : ''
                })
            }
        )
    })

    return newData
}
