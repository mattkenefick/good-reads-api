
export default class Cache
{
    /**
     * @param int ttl
     */
    constructor(ttl = 60) {
        this.items = {};
        this.timeToLive = ttl;
    }

    /**
     * Attempt to get cache
     *
     * @param string key
     * @return string
     */
    get(key) {
        return this.has(key)
            ? this.items[key].value
            : null;
    }

    /**
     * If we have a valid cache key based off ttl
     *
     * @param string key
     * @return bool
     */
    has(key) {
        return this.items[key]
            && this.items[key].created > (Date.now() / 1000) - this.timeToLive;
    }

    /**
     * Set a cached item
     *
     * @param string key
     * @param string value
     * @return void
     */
    set(key, value) {
        const created = Date.now() / 1000;
        this.items[key] = { created, value };
    }
}
