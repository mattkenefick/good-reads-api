<template>
	<main id="app">
		<header>
			<section class="branding">
				<a href="/" title="Home">
					<img src="./assets/branding.svg" />
				</a>
			</section>

			<nav>
				<a href="#" title="Lorem New Books">
					<span>New Books</span>
				</a>
				<a href="#" title="Lorem Used Books">
					<span>Used Books</span>
				</a>
				<a href="#" title="Lorem Gifts">
					<span>Gifts</span>
				</a>
				<a href="#" title="Lorem News">
					<span>News</span>
				</a>
				<a href="#" title="Lorem Events">
					<span>Events</span>
				</a>
			</nav>

			<section class="account">
				<a href="#" target="_blank" title="View profile">
					<i class="fas fa-user icon-user"></i>
				</a>
			</section>
		</header>

		<article>
			<router-view />
		</article>

		<footer>
			<section>
				<a href="/" title="Home">
					<img src="./assets/branding.svg" height="50" />
				</a>
			</section>

			<section>
				<a href="#" title="Lorem New Books">
					<span>New Books</span>
				</a>
				<a href="#" title="Lorem Used Books">
					<span>Used Books</span>
				</a>
				<a href="#" title="Lorem Gifts">
					<span>Gifts</span>
				</a>
				<a href="#" title="Lorem News">
					<span>News</span>
				</a>
				<a href="#" title="Lorem Events">
					<span>Events</span>
				</a>
			</section>

			<section>
				<a href="https://www.facebook.com/polymermallard" target="_blank" title="View us on Facebook">
					<i class="fab fa-facebook"></i>
					<span>Facebook</span>
				</a>
				<a href="https://www.instagram.com/mattkenefick" target="_blank" title="View us on Instagram">
					<i class="fab fa-instagram"></i>
					<span>Instagram</span>
				</a>
				<a href="https://www.twitter.com/mattkenefick" target="_blank" title="View us on Twitter">
					<i class="fab fa-twitter"></i>
					<span>Twitter</span>
				</a>
			</section>
		</footer>
	</main>
</template>

<style lang="scss">
	#app {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		font-family: Montserrat, Helvetica, Arial, sans-serif;
		margin: 0 auto;
		max-width: 1024px;
	}

	#app > header {
		align-items: center;
		display: flex;
		margin-top: 2rem;

		.branding {
			width: 250px;

			img {
				width: 80%;
			}
		}

		nav {
			flex: 1 1 auto;

			a {
				color: #333;
				display: inline-block;
				font-size: 0.875rem;
				font-weight: 700;
				padding: 0.25rem;
				margin: 0 0.5rem;
				text-decoration: none;
				text-transform: uppercase;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.account {
			text-align: right;
			width: 250px;

			.icon-user {
				font-size: 1.5rem;
			}
		}
	}

	#app > article {
		min-height: 50vh;
	}

	#app > footer {
		border-top: 1px solid #f1f1f1;
		color: #999;
		display: flex;
		font-size: 0.875rem;
		margin-top: 3rem;
		padding-top: 3rem;

		section {
			padding-right: 2rem;
		}

		section > a {
			display: block;
			font-size: 0.875em;
			margin-bottom: 1rem;

			i {
				margin-right: 0.25rem;
			}
		}
	}
</style>
