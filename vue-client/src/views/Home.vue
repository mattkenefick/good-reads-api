<template>
	<div class="view-home">
		<header>
			<h1>Search for books</h1>
		</header>

		<!-- Search bar -->
		<form action="/search" method="GET" ref="form" v-on:submit="Handle_OnSubmit">
			<fieldset class="type-search">
				<input name="q" placeholder="Search..." ref="query" type="text" />

				<button type="submit">
					<i class="fas fa-search"></i>
				</button>
			</fieldset>
		</form>

		<!-- Results list -->
		<section class="view-results" v-if="hasResults()">
			<header>
				<p>
					<span>Page</span>
					&nbsp;
					<strong>{{ model.response.meta.page }}</strong>
				</p>
				<p>
					<strong>{{ model.response.meta.total }}</strong>
					&nbsp;
					<span>total items</span>
				</p>
			</header>

			<ComponentBook
				v-for="model in results"
				:key="model.id"
				:model="model" />
		</section>

		<!--
			We'd ordinarily have some logic to determine if anything had
			been fetched using XHR data. To simplify, we'll just check if we
			have results
		-->
		<section class="view-no-results" v-if="!hasResults()">
			<h2>No results</h2>
		</section>

		<!-- Pagination -->
		<section class="view-pagination" v-if="hasResults()">
			<button class="btn-previous" v-on:click="Handle_OnClickPreviousPage">
				<i class="fas fa-angle-left" />
			</button>
			<button class="btn-next" v-on:click="Handle_OnClickNextPage">
				<i class="fas fa-angle-right" />
			</button>
		</section>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import ModelGoodReads from '@/models/goodreads';
	import ComponentBook from '@/components/Book.vue';

	@Component({
		components: {
			ComponentBook,
		}
	})
	export default class Home extends Vue
	{
		/**
		 * @return HTMLFormElement
		 */
		public get form(): HTMLFormElement {
			return this.$refs.form as HTMLFormElement;
		}

		/**
		 * Model for GoodReads
		 * This would ordinarily be a model/colletion combo, but we're using
		 * an extremely slim architecture for this test.
		 *
		 * @type ModelGoodReads
		 */
		public model: ModelGoodReads = new ModelGoodReads;

		/**
		 * Results
		 *
		 * @type ModelGoodReads[]
		 */
		public results?: ModelGoodReads[] = [];

		/**
		 * Get query from form
		 *
		 * @return string
		 */
		public getQuery(): string {
			return (this.$refs.query as HTMLInputElement).value;
		}

		/**
		 * Check if we have results
		 *
		 * @return boolean
		 */
		public hasResults(): boolean {
			return !!(this.results && this.results.length > 0);
		}

		/**
		 * Search on model
		 *
		 * @return void
		 */
		public search(): void {
			this.model
				.search(this.getQuery())
				.then((collection: ModelGoodReads[]) => this.results = collection);

			// Go to top. Ordinarily, this would be an event hook elsewhere
			window.scrollTo(0, 0);
		}

		/**
		 * Click previous page button
		 *
		 * @param MouseEvent e
		 * @return void
		 */
		private Handle_OnClickPreviousPage(e: MouseEvent): void {
			e.preventDefault();

			// Increment page
			let page: number = parseFloat(this.model.queryParameters.page || '1');
			this.model.setQueryParameter('page', Math.max(1, page - 1));

			// Run search again
			this.search();
		}

		/**
		 * Click next page button
		 *
		 * @todo Add logic in our models to determine available pages based
		 * on results. Or we could add pagination directly to the API endpoint
		 * and use that.
		 *
		 * @param MouseEvent e
		 * @return void
		 */
		private Handle_OnClickNextPage(e: MouseEvent): void {
			e.preventDefault();

			// Increment page
			let page: number = parseFloat(this.model.queryParameters.page || '1');
			this.model.setQueryParameter('page', page + 1);

			// Run search again
			this.search();
		}

		/**
		 * @param Event e
		 * @return void
		 */
		private Handle_OnSubmit(e: Event): void {
			e.preventDefault();

			// Reset to page 1
			this.model.setQueryParameter('page', 1);

			// Search
			this.search();
		}
	}
</script>

<style lang="scss">
	.view-home {
		header {
			h1 {
				font-size: 3rem;
				margin-bottom: 0.75rem;
			}
		}

		.view-results {
			padding: 2rem 0;

			header {
				color: #ccc;
				display: flex;
				justify-content: space-between;
				font-size: 0.875em;
				padding: 0 1rem;
				text-transform: uppercase;
			}
		}

		.view-pagination {
			text-align: center;

			button {
				$size: 40px;

				background-color: #333;
				color: #fff;
				height: $size;
				line-height: $size;
				margin: 1rem;
				text-align: center;
				width: $size;
			}
		}
	}
</style>
