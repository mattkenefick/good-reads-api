
/**
 * Extremely slimmed down base level of a Model/Collection for
 * the purposes of the GoodReads test.
 *
 * @author Matt Kenefick <matt@polymermallard.com
 */
export default class ModelBase
{
    /**
     * @type string
     */
    public get baseUrl() {
        return 'http://localhost:3030/';
    }

    /**
     * @type string
     */
    public get endpoint() {
        return 'test';
    }

	/**
	 * @type object
	 */
	public attributes?: any = {};

	/**
	 * @type object
	 */
	public queryParameters: any = {};

	/**
	 * We'd extract more of this with a feature rich library
	 *
	 * @type IResponse
	 */
	public response: any;

    /**
     * @param object queryParameters
     * @return void
     */
    constructor(attributes: any = {}) {
        // Set defaults
        this.setQueryParameter('limit', '15');
        this.setQueryParameter('page', '1');

		// Set attributes
		this.attributes = Object.assign(this.attributes, attributes || {});
    }

    /**
     * @return object
     */
    public getData() {
        return this.response.data;
    }

    /**
     * @return object
     */
    public getMeta() {
        return this.response.meta;
    }

    /**
     * Set a query parameter
     *
     * @param string key
     * @param string value
     * @return this
     */
    public setQueryParameter(key: string, value: string|number): this {
        this.queryParameters[key] = value;

        return this;
    }

    /**
     * Fetch a URL
     *
     * @param string endpoint
     * @param object queryParameters
     * @return Promise
     */
    public async fetch(endpoint: string = '', queryParameters: any = {}) {
        endpoint = endpoint || this.endpoint;
        queryParameters = Object.assign(this.queryParameters, queryParameters || {});

        const url = this.getUrl(endpoint, queryParameters);

		return fetch(url)
			.then(response => response.json())
			.then(json => this.Handle_OnResponse(json));
    }

    /**
     * Returns query params object as search string
     *
     * @param object queryParameters
     * @return string
     */
    protected getQueryParametersAsString(queryParameters: any = {}) {
        return Object.keys(this.queryParameters)
            .map(key => key + '=' + this.queryParameters[key])
            .join('&');
    }

    /**
     * Gets a full URL as string including host, path, and query params
     *
     * @param string endpoint
     * @param object queryParameters
     * @return string
     */
    protected getUrl(endpoint: string = '', queryParameters: any = {}): string {
        const queryParametersAsString = this.getQueryParametersAsString(queryParameters);

        return [
            this.baseUrl,
            endpoint || this.endpoint,
            '?',
            queryParametersAsString,
        ].join('');
    }

	/**
	 * After a response, we'll parse it into a mock collection which is
	 * just an array in this case. In an actual project, the logic here
	 * would be more elaborate and extensive.
	 *
	 * @param object json
	 */
	private Handle_OnResponse(json: any) {
		const collection: any = [];

		// Extremely basic check to see if we have data
		if (!json?.data?.length) {
			return collection;
		}

		// Save response
		this.response = json;

		// Check for data
		json.data.forEach((item: any) => {
			// @ts-ignore
			const model: any = new this.constructor(item);
			collection.push(model);
		});

		return collection;
	}
}
