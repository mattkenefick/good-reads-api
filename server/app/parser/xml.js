
import xml2js from 'xml2js';

export default class ParserXml // implements IParser
{
    /**
     * @param string xmlStr
     * @return void
     */
    constructor(xmlStr) {
        this.parsed = null;
        this.set(xmlStr);
    }

    /**
     * Parse our string to a useable object
     *
     * @return Promise<Object>
     */
    async parse() {
        // const parser = new DOMParser();
        // const dom = parser.parseFromString(this.xmlStr, 'application/xml');
        // this.parsed = dom.documentElement;

        return new Promise((resolve, reject) => {
            xml2js.parseString(this.xmlStr, function (err, result) {
                resolve(result);
            });
        });
    }

    /**
     * @param string xmlStr
     * @return this;
     */
    set(xmlStr) {
        this.xmlStr = xmlStr;

        return this;
    }
}
