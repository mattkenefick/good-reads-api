
/**
 * A transformer should be more than this, but for the
 * simple case of this test, I'm settling on a fairly
 * coupled example here.
 *
 * @author Matt Kenefick <matt@polymermallard.com>
 */
export default class TransformerGoodReads
{
    /**
     * Return formed envelope
     *
     * @return object
     */
    get envelope() {
        return {
            data: this.getData(),
            meta: this.getMeta(),
        }
    }

    /**
     * @param object response
     * @param int limit
     * @return void
     */
    constructor(response, limit = 20) {
        this.limit = limit;
        this.root = response.GoodreadsResponse.search;
    }

    /**
     * Return a meta object for our API responses
     *
     * @return object
     */
    getMeta() {
        const limit = this.limit;
        const query = this.root.query;
        const page = Math.ceil(parseFloat(this.root['results-start']) / limit);
        const total = parseFloat(this.root['total-results']);

        return {
            limit, query, page, total,
        };
    }

    /**
     * Return data
     *
     * @return object
     */
    getData() {
        if (!this.root.results || !this.root.results.work) {
            return {};
        }

        return this.root.results.work.length >= 1
            ? this.root.results.work
            : [this.root.results.work];
    }
}
