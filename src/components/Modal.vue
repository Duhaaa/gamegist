<template>
	<div class="modal-bg flex items-center" @click="hideModal">
		<div class="modal rounded container md:mx-auto mx-4" @click.stop>
			<div class="block md:flex">
				<div class="w-full md:w-1/3">
					<div
						class="game-img rounded-br"
						:style="{
							backgroundImage: `url(${game.background_image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}"
					></div>
					<div class="px-10 mt-4">
						<h1 class="block md:hidden game-title tracking-widest" v-if="game.name">
							{{ game.name.toUpperCase() }}
						</h1>
						<h3>Metascore</h3>
						<p>{{ game.metacritic ? game.metacritic : '-' }}</p>
						<h3>Platforms</h3>
						<div
							class="inline-block text-2xl platforms"
							v-for="platform in game.parent_platforms"
							:key="platform.id"
						>
							<i v-if="platform.platform.id === 1" class="ri-windows-fill"></i>
							<i
								v-if="platform.platform.id === 2"
								class="ri-playstation-fill"
							></i>
							<i v-if="platform.platform.id === 3" class="ri-xbox-fill"></i>
							<i
								v-if="platform.platform.id === 4"
								class="ri-smartphone-fill"
							></i>
							<i v-if="platform.platform.id === 5" class="ri-android-fill"></i>
							<i v-if="platform.platform.id === 6" class="ri-apple-fill"></i>
							<i v-if="platform.platform.id === 7" class="ri-ubuntu-fill"></i>
							<i v-if="platform.platform.id === 8" class="ri-switch-fill"></i>
						</div>
						<h3>Genres</h3>
						<p v-if="game.genres">
							{{ game.genres.map((g) => g.name).join(", ") }}
						</p>
						<p v-else>-</p>
						<h3>Release Date</h3>
						<p>
							{{
								game.released ? 
								stringToDate(game.released, {
									day: "numeric",
									month: "long",
									year: "numeric",
								}) : '-'
							}}
						</p>
						<h3>Website</h3>
						<p>
							<a class="game-website break-all" :href="game.website" target="_blank">{{
								game.website ? game.website : '-'
							}}</a>
						</p>
					</div>
				</div>
				<div class="w-full md:w-2/3 px-10 md:mx-10 mt-20 md:mt-4">
					<h1 class="hidden md:block game-title tracking-widest" v-if="game.name">
						{{ game.name.toUpperCase() }}
					</h1>
					<h2>About</h2>
					<div class="game-content" v-html="game.description"></div>
				</div>
			</div>
			<div class="w-full px-10 mt-10 md:mt-4 mb-4">
				<button class="close-btn w-full md:w-1/5 py-1 rounded tracking-wide sm:ml-auto" @click="hideModal">CLOSE</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showModal: Boolean,
		game: Object
	},
	methods: {
		hideModal() {
      this.$store.commit("setGame", []);
			this.$store.commit("setModal", false);
			if(!this.$store.state.showModal) {
				document.querySelector("body").style.overflowY = 'auto';
			}
		},
		
		stringToDate(date, options) {
      return new Date(date).toLocaleDateString("en-US", options);
    }
	}
};
</script>

<style scoped>
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal {
  background-color: #fcfcfc;
  max-height: 80%;
  overflow-y: auto;
	animation: slideUp .4s ease-out;
}

@keyframes slideUp {
	0% {
		opacity: 0;
		transform: translateY(40px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.game-title {
  font-family: 'SnakeJacket', sans-serif;
  color: black;
  font-size: 1.8rem;
  line-height: 4rem;
  color: #222;
}

.modal h2 {
  font-weight: bold;
  margin-top: 30px;
  font-size: 2rem;
  color: #222;
}

.game-content >>> h3, .modal h3 {
  margin-top: 45px;
  font-size: 1.2rem;
  font-weight: bold !important;
  color: #222;
  letter-spacing: .05em;
}

.game-content >>> p, .modal p {
  margin-top: 10px;
  color: gray;
}

.platforms i {
  color: gray;
  margin-right: .7rem;
}

.game-website {
  color: gray;
}

.game-website:hover {
  color: #e94560;
}

.game-img {
  min-height: 499px;
  max-height: 500px;
}

.close-btn {
	border: 2px solid #e94560;
	background-color: #FCFCFC;
	color: #e94560;
	display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover {
	background-color: #e94560;
	color: #fcfcfc;
}

.close-btn:active, .close-btn:focus {
	outline: none;
}

@media (max-width: 640px) {
	.game-img {
		min-height: 199px;
		max-height: 200px;
	}
	.game-title {
		font-size: 1.2rem;
	}
}
</style>
