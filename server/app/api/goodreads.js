
import ApiBase from './base.js';

export default class ApiGoodReads extends ApiBase
{
    /**
     * @type string
     */
    get baseUrl() {
        return 'https://www.goodreads.com/';
    }

    /**
     * @type string
     */
    get endpoint() {
        return 'search/index.xml';
    }

    /**
     * @param IGoodReadCredentials credentials
     * @return void
     */
    constructor(credentials) {
        super();

        this.configure(credentials);
    }

    /**
     * Configure our credentials
     *
     * @param IGoodReadCredentials credentials
     * @return void
     */
    configure(credentials) {
        this.setQueryParameter('key', credentials.KEY);
    }

    /**
     * Shorthand for searching books
     *
     * @param string query
     * @param string page
     * @return Promise<T>
     */
    search(q, page = '1') {
        return this.fetch(this.endpoint, {
            q,
            page,
        });
    }
}
