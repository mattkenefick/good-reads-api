
export interface IGoodReadsBook {
	average_rating: string;
	best_book: IGoodReadsBestBook;
	books_count: string;
	id: string;
	original_publication_day: string;
	original_publication_month: string;
	original_publication_year: string;
	ratings_count: string;
}

export interface IGoodReadsAuthor {
	id: string;
	name: string;
}

export interface IGoodReadsBestBook {
	author: IGoodReadsAuthor;
	id: string;
	image_url: string;
	small_image_url: string;
	title: string;
}
