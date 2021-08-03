<template>
	<div class="view-book">
		<figure>
			<img :src="model.getImage()" />
		</figure>

		<article>
			<h3>{{ model.getTitle() }}</h3>
			<p>
				<span>By:</span>
				<a href="#">
					{{ model.getAuthorName() }}
				</a>
			</p>
		</article>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import ModelGoodReads from '@/models/goodreads';

	@Component
	export default class ViewBook extends Vue
	{
		/**
		 * Model for GoodReads
		 *
		 * @type ModelGoodReads
		 */
		@Prop({
			default: () => new ModelGoodReads,
		})
		public model?: ModelGoodReads;
	}
</script>

<style lang="scss">
	.view-book {
		display: inline-block;
		width: 33%;
		vertical-align: top;

		figure {
			background-color: #f1f1f1;
			margin: 5px;
			padding: 3rem 4rem;
			transition: background-color 0.25s ease-in-out;

			img {
				height: 300px;
				transition: transform 0.25s ease-in-out;
			}
		}

		article {
			color: #222;
			font-size: 0.875em;
			padding: 0.5rem;
		}

		&:hover figure {
			background-color: #DB663B;

			img {
				transform: scale(1.025);
			}
		}
	}
</style>
