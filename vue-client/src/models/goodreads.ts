
import ModelBase from '@/models/base';
import { IGoodReadsBook } from '@/interfaces/goodreads';

/**
 * Super basic model representation of GoodReads just to
 * get the point across.
 *
 * @author Matt Kenefick <matt@polymermallard.com
 */
export default class ModelGoodReads extends ModelBase
{
	/**
	 * @type object
	 */
	public attributes?: IGoodReadsBook;

    /**
     * @type string
     */
    public get endpoint() {
        return 'search';
    }

	/**
	 * Shorthand for search
	 *
	 * @param string query
	 * @return Promise
	 */
	public search(query: string): Promise<ModelGoodReads[]>
	{
		return this.setQueryParameter('q', query)
			.fetch();
	}

	/**
	 * In a real project, we'd separate this into its own class
	 * like ModelAuthor which would auto populate from a more
	 * verbose Model/Collection library.
	 *
	 * @type string
	 */
	public getAuthorName(): string {
		return this.attributes?.best_book.author.name || '';
	}

	/**
	 * @type string
	 */
	public getImage(): string {
		return this.attributes?.best_book.image_url || '';
	}

	/**
	 * @type string
	 */
	public getTitle(): string {
		return this.attributes?.best_book.title || '';
	}
}
