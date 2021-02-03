<template>
	<div class="p-6 min-h-screen">
		<PageTitle :title="'Search results for: ' + $route.query.q"/>
		<Spinner v-if="fetching" />
		<GameList v-else :games="games"/>
	</div>
	<Modal v-if="showModal" :game="game"/>
</template>

<script>
import { onMounted, computed, watch, ref } from "vue";
import { useStore } from "vuex";
//import axios from "axios";
import { useRoute } from "vue-router";
import PageTitle from "../components/PageTitle";
import GameList from "../components/GameList";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";

export default {
	name: "Search",
	components: {
		PageTitle,
		GameList,
		Modal,
		Spinner,
	},

	setup() {
		const store = useStore();
		const games = computed(() => store.state.games);
		const game = computed(() => store.state.game);
		const fetching = computed(() => store.state.fetching);
		const route = ref(useRoute());
		const showModal = computed(() => store.state.showModal);

		onMounted(() => {
			fetchSearchResults();
		});

		const fetchSearchResults = async () => {
			await store.dispatch("fetchGamesByQuery", route.value.query.q);
		};

		watch(() => route.value.query.q, (first, second) => {
			if(first !== second) {
				fetchSearchResults();
			}
		});

		return {
			games,
			game,
			fetchSearchResults,
			fetching,
			showModal
		};
	},
};
</script>

<style>
h1 {
	color: #fcfcfc;
	font-size: 2rem;
}
</style>
