

import fs from "fs";

function readImageUtil(route: any){
    let image = "";
    try {
      const readImage = fs.readFileSync(route);
      image = readImage.toString("base64");
      return image;
    } catch (_) {
      return image;
    }
}

module.exports = {readImageUtil}