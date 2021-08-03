
import xml2js from 'xml2js';

/**
 * This parser class will handle XML from the server
 * and implements an imaginary IParser class. We have
 * designed this in such a way that we could create
 * other types of parsers but are limiting it to XML
 * for the scope of this test.
 *
 * @author Matt Kenefick <matt@polymermallard.com
 */
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
            const options = {
                explicitArray: false,
                ignoreAttrs: true,
                mergeAttrs: true
            };
            xml2js.parseString(this.xmlStr, options, function (err, result) {
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
