<template>
  <div id="search">
    <form @submit.prevent="search">
		<section class="section">
                <div class="columns">
                    <div class="column is-4 is-offset-4">
						<div class="field">
							<label class="label">Search Movie Title</label>
							<img src="../assets/reel.png" class="hide"/>
							<div class="control">
								<input class="input is-rounded" v-model="name" name="name" placeholder="Movie Title">
							</div>
						</div>
						<div class="field is-grouped">
							<div class="control">
								<button class="button is-link is-rounded">Search</button>
						
							</div>
						</div>
                    </div>
                </div>
		</section>
	</form>

	<div class="grid-container">
		<main id="display" class="grid-item main">
			<div id="scroller" class="items hide">
			</div>
		</main>
	</div>
  </div>
</template>

<script>
	//<img data-v-0eca37cb="" srcset="/img/reel.e6caa21c.png" 
	//<img srcset="https://image.tmdb.org/t/p/original/cezWGskPY5x7GaglTTRN4Fugfb8.jpg" draggable="false"/>
import tool from '../search';
import scroll from '../scroll';

export default {
	name: 'SearchBar',
	data() {
		return {
			name: '',
		}
	},
	mounted() {
		scroll.startup();
	},
	methods:{
		search(){
			tool.find(this.name, (response) =>{
				console.log(response);
			});
		}
	}
}
</script>

<style scoped>


a{
	text-decoration: underline;
}
a:hover{
	color:darkblue;
}

.title{
	color:black;
	top:300px;
	right:200px;
	position:relative;
}

.hide{
	display:none;
}

.tiny{
	height:300px;
	width: auto;
	float:left;
}

$gray: #555;
$yellow: #f2e968;
$white: #efefef;

@import url(https://fonts.googleapis.com/css?family=Rubik);

body,
html {
	text-align: center;
	background: $white;
	font-family: Helvetica, sans-serif;
	margin: 0;
}

.grid-container {
	background: $white;
	font-family: "Rubik", sans-serif;
}

@supports (display: grid) {
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto 1fr auto;

		grid-template-areas:
		"header header header"
		"title title footer"
		"main main main";
		@media screen and (max-width: 200px) {
			grid-template-columns: 1fr;
			grid-template-rows: 0.3fr 1fr auto 1fr;
			grid-template-areas:
			"header"
			"title"
			"main"
			"footer";
		}
	}

	.grid-item {
		color: #fff;
		padding: 1em 1.5em;
		font-size: 1em;
		font-weight: 700;

	}

	.main {
		color: lighten($gray, 25%);
		grid-area: main;
		padding: 0;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.items {
		position: relative;
		width: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
		transition: all 0.2s;
		transform: scale(0.98);
		will-change: transform;
		user-select: none;
		cursor: pointer;

	}

	.items.active {
		cursor: grabbing;
		cursor: -webkit-grabbing;
		transform: scale(1);
	}

	.item {
		display: inline-block;
		min-height: 325px;
		min-width: 50px;
		margin: 2em 1em;
		@media screen and (max-width: 200px) {
			min-height: 200px;
			min-width: 50px;
		}
	}
}
</style>

