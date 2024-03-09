

import fs from "fs"
import { Directory, DBFilter } from "../../src/DB/Singleton";
const {readImageUtil} = require("../Utils/readImageUtil")
const {readXmlUtil} = require("../Utils/readXmlUtil");

function getFilesData(index: number, type: "first" | "next" | "previous") {
    try {
        const readeDBFile = DBFilter.get();
        const findFileById = readeDBFile[index];
        if (!findFileById) return {status: false, message: "file not found"};
    
        const readeFilesDirectory = fs.readdirSync(findFileById.path);
        const docTopPath = `${findFileById.path}\\TOP_CAM_doc.xml`;
        const docDownPath = `${findFileById.path}\\DOWN_CAM_doc.xml`;
    
        const topFiles = readeFilesDirectory.filter((item: any) => item.includes("image.bmp") && item.includes("TOP"));
        const downFiles = readeFilesDirectory.filter((item: any) => item.includes("image.bmp") && item.includes("DOWN"));
    
        const topImages: any = [];
        topFiles.forEach((item: any) => {
          let file: any = {};
          const FixedName = item.split("image.bmp").join("");
          file.image = readImageUtil(`${findFileById.path}\\${item}`);
          file.state = readXmlUtil(`${findFileById.path}\\${FixedName}state.xml`);
          topImages.push(file);
        })
    
        const downImages: any = [];
        downFiles.forEach((item: any) => {
          let file: any = {};
          const FixedName = item.split("image.bmp").join("");
          file.image = readImageUtil(`${findFileById.path}\\${item}`);
          file.state = readXmlUtil(`${findFileById.path}\\${FixedName}state.xml`);
          downImages.push(file);
        })
    
        let allRecord: [] = [];
        if (type === "first") {
          allRecord = readeDBFile
        }
    
    
        const dataStructure = {
          id: findFileById.id,
          docTop: readXmlUtil(docTopPath),
          docDown: readXmlUtil(docDownPath),
          topImages,
          downImages,
          allRecord,
          directory: Directory.get()
        };
    
        return {status: true, data: dataStructure}
    } catch (_) {
          return {status: false, message: "DB not found !!!"}
      }
}



module.exports = getFilesData;