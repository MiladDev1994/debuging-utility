const fs = require("fs")
const path = require("path")
const colors = require('colors');
const {readXmlUtil} = require("../Utils/readXmlUtil");
const {Directory, DB, DBFilter, ConfigPath, Keys} = require("../DB/Singleton")


function walkDirectory(directory: string) {
    let counter = 0;
    const count: any = {
        numAll: 0,
        numTop: 0,
        numDown: 0,
        numPaired: 0,
        numReject: -1,
        numAccept: -1,
    }
    const allRecord: any = []
    let status = "undefined";
    let permissionCreateConfigJson = true;

    function walkDir(rootDirectory: any) {
        try {
            const fNamesInRoot = fs.readdirSync(rootDirectory);
            fNamesInRoot.forEach((fNameInRoot: any) => {
                const fPathInRoot = path.join(rootDirectory, fNameInRoot);
                
                let hasTop = false;
                let hasDown = false;
                if (fs.statSync(fPathInRoot).isDirectory()) {
                    const fNamesInCurrentDirectory = fs.readdirSync(fPathInRoot);
                    if (fNameInRoot === "Accept") status = "Accept";
                    if (fNameInRoot === "Reject") status = "Reject"; 
                    
                    const findTop = fNamesInCurrentDirectory.filter((item: string) => item.includes("TOP")).length
                    const findDown = fNamesInCurrentDirectory.filter((item: string) => item.includes("DOWN")).length
                    if (findTop) {
                        hasTop = true;
                        count.numTop++;
                    } 
                    if (findDown) {
                        hasDown = true;
                        count.numDown++;
                    } 
                    if (findTop && findDown) count.numPaired++;
                    if (status === "Accept") count.numAccept++;
                    if (status === "Reject") count.numReject++;
                    
                    if (fNamesInCurrentDirectory.includes("DOWN_CAM_doc.xml") || fNamesInCurrentDirectory.includes("TOP_CAM_doc.xml")) {


                        if (permissionCreateConfigJson) {
                            
                            try {
                                const readConfigs = fs.readFileSync(ConfigPath)
                                const parsConfig = JSON.parse(readConfigs)

                                if (fNamesInCurrentDirectory.includes("TOP_CAM_0_state.xml") && permissionCreateConfigJson) {
                                    permissionCreateConfigJson = false;
                                    const readCam = readXmlUtil(`${fPathInRoot}\\TOP_CAM_0_state.xml`)
                                    const readDoc = readXmlUtil(`${fPathInRoot}\\TOP_CAM_doc.xml`)
        
                                    Object.keys(readCam.opencv_storage).map(item => {
                                        const existKey = parsConfig.findIndex((ele: any) => ele.value === item)
                                        if (existKey === -1) {
                                            const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                            parsConfig.push({
                                                id: findMaxId + 1,
                                                value: item,
                                                act: false
                                            })
                                        }
                                    })
                                    
                                    Object.keys(readDoc.opencv_storage).map(item => {
                                        const existKey = parsConfig.findIndex((ele: any) => ele.value === item)
                                        if (existKey === -1) {
                                            const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                            parsConfig.push({
                                                id: findMaxId + 1,
                                                value: item,
                                                act: false
                                            })
                                        }
                                    })
                                }
        
                                if (fNamesInCurrentDirectory.includes("DOWN_CAM_0_state.xml") && permissionCreateConfigJson) {
                                    permissionCreateConfigJson = false;
                                    const readCam = readXmlUtil(`${fPathInRoot}\\DOWN_CAM_0_state.xml`)
                                    const readDoc = readXmlUtil(`${fPathInRoot}\\DOWN_CAM_doc.xml`)
        
                                    Object.keys(readCam.opencv_storage).map(item => {
                                        const existKey = parsConfig.findIndex((ele: any) => ele.value === item)
                                        if (existKey === -1) {
                                            const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                            parsConfig.push({
                                                id: findMaxId + 1,
                                                value: item,
                                                act: false
                                            })
                                        }
                                    })
                                    Object.keys(readDoc.opencv_storage).map(item => {
                                        const existKey = parsConfig.findIndex((ele: any) => ele.value === item)
                                        if (existKey === -1) {
                                            const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                            parsConfig.push({
                                                id: findMaxId + 1,
                                                value: item,
                                                act: false
                                            })
                                        }
                                    })
                                }

                                Keys.set(parsConfig)
                                fs.writeFile(ConfigPath, JSON.stringify(parsConfig, null, 4), function(err: any, result: any) {
                                    if(err) console.error("error");
                                });

                            } catch (err) {

                                const parsConfig: any = [];

                                if (fNamesInCurrentDirectory.includes("TOP_CAM_0_state.xml") && permissionCreateConfigJson) {
                                    permissionCreateConfigJson = false;
                                    const readCam = readXmlUtil(`${fPathInRoot}\\TOP_CAM_0_state.xml`)
                                    const readDoc = readXmlUtil(`${fPathInRoot}\\TOP_CAM_doc.xml`)
        
                                    Object.keys(readCam.opencv_storage).map(item => {
                                        const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                        parsConfig.push({
                                            id: findMaxId + 1,
                                            value: item,
                                            act: false
                                        })
                                    })
                                    
                                    Object.keys(readDoc.opencv_storage).map(item => {
                                        const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                        parsConfig.push({
                                            id: findMaxId + 1,
                                            value: item,
                                            act: false
                                        })
                                    })
                                }
        
                                if (fNamesInCurrentDirectory.includes("DOWN_CAM_0_state.xml") && permissionCreateConfigJson) {
                                    permissionCreateConfigJson = false;
                                    const readCam = readXmlUtil(`${fPathInRoot}\\DOWN_CAM_0_state.xml`)
                                    const readDoc = readXmlUtil(`${fPathInRoot}\\DOWN_CAM_doc.xml`)
        
                                    Object.keys(readCam.opencv_storage).map(item => {
                                        const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                        parsConfig.push({
                                            id: findMaxId + 1,
                                            value: item,
                                            act: false
                                        })
                                        
                                    })
                                    Object.keys(readDoc.opencv_storage).map(item => {
                                        const findMaxId = parsConfig.length ? parsConfig.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
                                        parsConfig.push({
                                            id: findMaxId + 1,
                                            value: item,
                                            act: false
                                        })
                                        
                                    })
                                }

                                Keys.set(parsConfig)
                                fs.writeFile(ConfigPath, JSON.stringify(parsConfig, null, 4), function(err: any, result: any) {
                                    if(err) console.error("error");
                                });

                            }
    
                            

                        }

                        counter++
                        count.numAll++
                        allRecord.push({
                            // id: counter,
                            path: fPathInRoot,
                            status,
                            hasTop,
                            hasDown,
                        })
                    } else {
                        walkDir(fPathInRoot)
                    } 
                }
            });
            
            if (!allRecord.length) {
                return {status: false, message: "data not found!!!"};
            }
            return {status: true, data: {count, allRecord}, message: "created"};

        } catch (error) {
            console.log(error)
            return {status: false, message: "directory not found!!!"}
        }
    }

    const walkResult: any = walkDir(directory);

    const sortAllRecord = walkResult.status ? walkResult.data.allRecord.sort((a: any, b: any) => 
        Number(a.path.split("\\").pop().replace("~", "").split("_").shift()) > Number(b.path.split("\\").pop().replace("~", "").split("_").shift()) ? 1 :
        Number(a.path.split("\\").pop().replace("~", "").split("_").shift()) < Number(b.path.split("\\").pop().replace("~", "").split("_").shift()) ? -1 : 0) : []

    const sortedData = {
        ...walkResult.data,
        allRecord: sortAllRecord
    }

    return {
        status: walkResult.status,
        data: walkResult.status ? sortedData : {},
        message: walkResult.message
    }
}


function scanDirectory(directory: string){  
    // const directory = Directory.get();

    // try {
    //   const readeDBFile = fs.readFileSync(`${directory}\\DB.json`)
    //   const parseDB = JSON.parse(readeDBFile)
    //   return {status: true, data: parseDB, message: "meta file found"}
    // } catch (_) {
        const readDB = walkDirectory(directory);
        if (!readDB.status) return {status: false, message: readDB.message};

        const count = readDB.data.count;
        const allRecord = readDB.data.allRecord;
        const addIdToAllRecord = allRecord.map((item: any, index: number) => {
            return {
                id: index + 1,
                ...item,
            }
        })

        Directory.set(directory)
        DB.set({count, allRecord: addIdToAllRecord})
        DBFilter.set(addIdToAllRecord)

        // fs.writeFile(`.\\src\\DB\\directory.json`, JSON.stringify({directory}, null, 4), function(err: any, result: any) {
        //     if(err) console.error(colors.red(err));
        // });

        // fs.writeFile(`${directory}\\DB.json`, JSON.stringify(readDB.data, null, 4), function(err: any, result: any) {
        //     if(err) console.error(colors.red(`Error: can't create meta file`));
        // });
        return {status: true, data: {count, allRecord: addIdToAllRecord}, message: readDB.message}
    // }
}

export default scanDirectory;

