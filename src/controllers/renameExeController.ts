

import {exec} from 'child_process'
import fs from 'fs'

const renameExe = (name: any) => {
    
  function renameFile() {
    setTimeout(() => {
      try {
        fs.copyFile(`D:\\PFKSORT\\Proc\\SortingProcessor_${name}.exe`, `D:\\PFKSORT\\Proc\\SortingProcessor.exe`, (err: any) => {
            if (err) console.log(err);
        });
        return {status: true, message: "success"}
      } catch (err) {
        console.log(err)
        return {status: false, message: err}
      }
    } , 1000)
  }
    
  try {
    exec('tasklist', function(err: any, stdout: any, stderr: any) {
      if (err) return {status: false, message: err}
        if (stdout.includes("SortingProcessor.exe")) {
            exec(`taskkill /f /t /im SortingProcessor.exe`, (err: any, stdout: any, stderr: any) => {
              if (err) return {status: false, message: err}
              if (stdout.includes("SUCCESS:")) {
                  renameFile()
              }
            })
        } else {
            renameFile()
        }
    })
    return {status: true, message: "success"}
  } catch (error) {
    return {status: false, message: error} 
  }

}

module.exports = renameExe;