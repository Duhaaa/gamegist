<template>
	<nav
		id="nav"
		class="sm:flex items-center justify-between flex-wrap p-6 sticky top-0 z-50"
	>
		<div
			class="container mx-auto w-full flex-grow justify-between sm:justify-start flex flex-wrap sm:flex-nowrap items-center w-auto"
		>
			<div>
				<router-link
					to="/"
					exact-active-class="home-active"
					id="site-title"
					class="sm:mt-4 sm:mr-12 inline-block lg:mt-0 tracking-wider"
					>GAMEGIST</router-link
				>
			</div>
			<div class="block mt-6 sm:mt-0 w-full sm:w-auto lg:flex-grow sm:mr-12 order-3 sm:order-none">
				<form @submit.prevent="searchGame" autocomplete="off">
					<input
						class="rounded w-full px-4 py-2"
						name="query"
						v-model="query"
						type="search"
						placeholder="Search games..."
					/>
				</form>
			</div>
			<div class="">
				<router-link
					to="/favorite"
					exact
					tag="i"
					class="ri-star-fill fav"
				></router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import { ref } from "vue";
import router from "@/router";
//import { useStore } from "vuex";

export default {
	setup() {
		//const store = useStore();
		const query = ref("");

		const searchGame = () => {
			if (query.value.trim() == "") {
				return;
			}
			router.replace({ name: "Search", query: { q: query.value } });
			//store.commit("setQuery", query.value);
			query.value = "";
		};

		return {
			query,
			searchGame,
		};
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap");
@font-face {
	font-family: "SnakeJacket";
	src: url("../assets/fonts/Snake Jacket.ttf");
}

#nav {
	background-color: #1a1a2e;
}

#nav a {
	font-family: "Roboto Slab", serif;
	font-size: 1.7rem;
	color: #fcfcfc;
}

#nav a:hover {
	color: #e94560;
}

#nav #site-title {
	font-family: "SnakeJacket", sans-serif;
	color: #fcfcfc;
	font-size: 1.8rem;
}

.fav {
	color: #fcfcfc;
	font-size: 1.5rem;
}

.fav:hover {
	color: #e94560;
	cursor: pointer;
}

.active {
	color: #e94560 !important;
}
</style>
