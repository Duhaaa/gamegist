<template>
	<div class="p-6 min-h-screen">
		<div class="container mx-auto">
			<h1 class="page-title">
				My Favorite Games
				{{ favoriteGames.length ? "(" + favoriteGames.length + ")" : null }}
			</h1>
			<div v-if="!favoriteGames.length">
				<h2>No favorite games found.</h2>
			</div>
			<div class="mt-8 flex flex-wrap items-start" v-else>
				<transition-group name="item" @leave="leave" appear mode="out-in">
					<div
						class="favcard sm:w-1/2 mb-4 cursor-pointer"
						v-for="favGame in favoriteGames"
						:key="favGame.id"
					>
						<div class="sm:mx-2 relative overflow-hidden" @click="getGameById(favGame.id)">
							<img
								class="rounded"
								:src="favGame.background_image"
								:alt="favGame.name"
							/>
							<p
								class="favgame-name text-sm absolute py-6 px-4 tracking-widest"
							>
								{{ favGame.name.toUpperCase() }}
							</p>
							<div class="btn-wrapper absolute mr-2 mt-1">
								<i
									class="close-btn ri-close-circle-fill"
									@click.stop="removeFavorite(favGame)"
								></i>
							</div>
						</div>
					</div>
				</transition-group>
			</div>
		</div>
	</div>
	<Modal v-if="showModal" :game="game"/>
</template>

<script>
import { ref, onMounted, nextTick, computed } from "vue";
import { useStore } from 'vuex'; 
import { gsap } from "gsap";
import Modal from '../components/Modal';

export default {
	name: "Favorite",
	components: {
		Modal
	},
	setup() {
		const store = useStore();
		const favoriteGames = ref([]);
		const showModal = computed(() => store.state.showModal);
		const game = computed(() => store.state.game);

		onMounted(() => {
			if (localStorage.getItem("favoriteGames")) {
				try {
					favoriteGames.value = JSON.parse(
						localStorage.getItem("favoriteGames")
					);
				} catch (e) {
					localStorage.removeItem("favoriteGames");
				}
			}
			nextTick(() => {
				if (favoriteGames.value.length) {
					gsap.from(".favcard", {
						y: 40,
						opacity: 0,
						stagger: { each: 0.2 },
					});
				}
			});
		});

		const leave = (el) => {
			gsap.to(el, { opacity: 0, duration: 1 });
		};

		const getGameById = (id) => {
			store.dispatch("fetchGameById", id).then(() => {
				store.commit("setModal", true);
				if(store.state.showModal) {
					document.querySelector("body").style.overflowY = 'hidden';
				}
			});
    }

		const removeFavorite = (game) => {
			const filtered = favoriteGames.value.filter((g) => g.id !== game.id);
			favoriteGames.value = filtered;
			const parsed = JSON.stringify(favoriteGames.value);
			localStorage.setItem("favoriteGames", parsed);
		};

		return {
			favoriteGames,
			removeFavorite,
			leave,
			getGameById,
			showModal,
			game
		};
	},
};
</script>

<style scoped>
@font-face {
	font-family: "SnakeJacket";
	src: url("../assets/fonts/Snake Jacket.ttf");
}

h2 {
	color: #fcfcfc;
	font-size: 1.3rem;
}

.favgame-name {
	color: #fcfcfc;
	font-family: "SnakeJacket", sans-serif;
	z-index: 10;
	bottom: 0;
	background: linear-gradient(
		180deg,
		rgba(26, 26, 46, 0.2049194677871149) 0%,
		rgba(26, 26, 46, 0.7035189075630253) 50%
	);
	width: 100%;
	line-height: 2.1rem;
}

.btn-wrapper {
	z-index: 10;
	top: 0;
	right: 0;
}

.close-btn {
	border-radius: 100%;
	font-size: 1.8rem;
	color: #1a1a2e;
	background-color: rgba(252, 252, 252, 0.4);
}

.close-btn:hover {
	cursor: pointer;
	color: #e94560;
	background-color: transparent;
}
</style>
