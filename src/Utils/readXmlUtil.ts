
import fs from "fs";
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

function readXmlUtil(route: any) {
    let xml = ""
    try {
      const readXml = fs.readFileSync(route, 'utf8');
      const parser = new XMLParser({
        ignoreAttributes: false,
      });
      xml = parser.parse(readXml);
      return xml;
    } catch (_) {
      return xml;
    }
}

module.exports = {readXmlUtil}