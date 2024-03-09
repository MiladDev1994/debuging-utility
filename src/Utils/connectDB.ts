
const os = require("os")
const fs = require("fs")
import {Directory, DB, DBFilter, Keys, ConfigPath} from "../DB/Singleton"

function connectDB() {

    // try {
    //     const readeDirectoryFile = fs.readFileSync(`${Directory.get()}\\directory.json`);
    //     const parseDirectory = JSON.parse(readeDirectoryFile)
    //     Directory.set(parseDirectory.directory)
    // } catch (_) {
    //     fs.writeFile(`${Directory.get()}\\directory.json`, JSON.stringify({directory: ""}, null, 4), function(err: any, result: any) {
    //         if(err) console.error("error");
    //     });
    // }
    
    // try {
    //     const readeDBFile = fs.readFileSync(`${Directory.get()}\\DB.json`);
    //     const parseDB = JSON.parse(readeDBFile)
    //     DB.set(parseDB)
    //     DBFilter.set(parseDB.allRecord)
    // } catch (_) {
    //     DB.set({})
    //     DBFilter.set([])
    //     console.log("error")
    // }


    try {
        const readKeyFile = fs.readFileSync(ConfigPath);
        const parseKeys = JSON.parse(readKeyFile)
        Keys.set(parseKeys)
    } catch (_) {
        fs.writeFile(ConfigPath, JSON.stringify([], null, 4), function(err: any, result: any) {
            if(err) console.error("error");
        });
        Keys.set([])
    }
}

module.exports = connectDB;