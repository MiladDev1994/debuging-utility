export const userPathsCreator = ({userName, userData, res}: any) => {
    let newPath: any = {};
    newPath[userName] = {
        ...userData[userName],
        [res.baseDirectory]: {} 
    }
    if (userData[userName] && userData[userName][res.baseDirectory]) {
        newPath[userName][res.baseDirectory] = {
            ...userData[userName][res.baseDirectory],
            [res.mode]: res.index,
        }
    } else {
        newPath[userName][res.baseDirectory] = {
            [res.mode]: res.index,
        }
    }
    return {
        ...userData,
        ...newPath
    };
} 