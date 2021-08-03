
import https from 'https';
import UtilCache from '../util/cache.js';
import ParserXml from '../parser/xml.js';

export default class ApiBase
{
    /**
     * @type string
     */
    get baseUrl() {
        return 'https://api.example.com/v1/';
    }

    /**
     * @type string
     */
    get endpoint() {
        return 'test';
    }

    /**
     * @param object queryParameters
     * @return void
     */
    constructor(queryParameters) {
        this.cache = new UtilCache;
        this.parser = new ParserXml;
        this.queryParameters = {};

        // Set defaults
        this.setQueryParameter('limit', '15');
        this.setQueryParameter('page', '1');

        // Override
        this.queryParameters = Object.assign(this.queryParameters, queryParameters || {});
    }

    /**
     * Fetch a URL
     *
     * @param string endpoint
     * @param object queryParameters
     * @return Promise
     */
    async fetch(endpoint, queryParameters) {
        endpoint = endpoint || this.endpoint;
        queryParameters = Object.assign(this.queryParameters, queryParameters || {});

        const url = this.getUrl(endpoint, queryParameters);
        const response = await this.request(url);

        const parsed = await this.parser.set(response).parse();

        return parsed;
    }

    /**
     * Make an HTTPS request to a URL
     *
     * @param string url
     * @return Promise
     */
    request(url) {
        const urlInstance = new URL(url);
        const options = {
            hostname: urlInstance.hostname,
            method: 'GET',
            path: urlInstance.pathname + urlInstance.search,
            port: 443,
        }
        const cacheKey = urlInstance.pathname + urlInstance.search;

        return new Promise((resolve, reject) => {
            let body = '';

            // Check for cache
            if (this.cache.has(cacheKey)) {
                return resolve(this.cache.get(cacheKey));
            }

            // Make request
            const req = https.request(options, res => {
                if (res.statusCode >= 400) {
                    const handled = this.Handle_ResponseError(res);
                    reject(handled);
                }

                res.on('data', data => body += data);

                res.on('end', () => {
                    const handled = this.Handle_OnResponseSuccess(res, body);
                    this.cache.set(cacheKey, handled);
                    resolve(handled);
                });
            });

            req.on('error', error => {
                reject(error);
            });

            req.end();
        });
    }

    /**
     * @param object queryParameters
     * @return string
     */
    getQueryParametersAsString(queryParameters) {
        return Object.keys(this.queryParameters)
            .map(key => key + '=' + this.queryParameters[key])
            .join('&');
    }

    /**
     * @param string endpoint
     * @param object queryParameters
     * @return string
     */
    getUrl(endpoint, queryParameters) {
        const queryParametersAsString = this.getQueryParametersAsString(queryParameters);

        return [
            this.baseUrl,
            endpoint || this.endpoint,
            '?',
            queryParametersAsString,
        ].join('');
    }

    /**
     * Set a query parameter
     *
     * @param string key
     * @param string value
     * @return this
     */
    setQueryParameter(key, value) {
        this.queryParameters[key] = value;

        return this;
    }

    /**
     * When our API request is 400-500
     *
     * @param Response response
     * @return void
     */
    Handle_ResponseError(response) {
        return {
            status: response.statusCode,
        }
    }

    /**
     * When our API request is 200
     *
     * @param Response response
     * @param string data
     * @return void
     */
    Handle_OnResponseSuccess(response, data) {
        const dataStr = data.toString('utf8');

        return dataStr;
    }
}