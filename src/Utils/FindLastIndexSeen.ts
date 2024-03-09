export const findLastIndexSeen = ({userData, userName, baseDirectory, mode, value}: any) => {

    let index = "0"
    try {
        if (userData[userName] && userData[userName][baseDirectory] && userData[userName][baseDirectory][mode]) {
            if (value) {
                index = userData[userName][baseDirectory][mode]
            } else {
                index = String(+userData[userName][baseDirectory][mode] - 1)
            }
        }
        return index
    } catch (error) {
        return index
    }
}