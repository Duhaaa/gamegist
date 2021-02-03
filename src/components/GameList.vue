<template>
  <div class="card-container container mx-auto">
      <div v-if="!games">
        <h2>No games found.</h2>
      </div>
      <transition-group name="cards" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave" appear mode="out-in">
      <div class="card mb-4 sm:px-2" v-for="(game, index) in games" :key="game.id" :data-index="index">
        <div class="card-item rounded hover:shadow-lg" @click="getGameById(game.id)">
          <img class="rounded" :src="game.background_image" :alt="game.name">
          <div class="p-4">
            <p class="game-name text-white text-sm leading-loose tracking-widest">{{game.name.toUpperCase()}}</p>
            <div class="mt-6 mb-10 flex items-end justify-between">
              <div>
                <div class="inline-block" v-for="platform in game.parent_platforms" :key="platform.id">
                  <i v-if="platform.platform.id === 1" class="ri-windows-fill"></i>
                  <i v-if="platform.platform.id === 2" class="ri-playstation-fill"></i>
                  <i v-if="platform.platform.id === 3" class="ri-xbox-fill"></i>
                  <i v-if="platform.platform.id === 4" class="ri-smartphone-fill"></i>
                  <i v-if="platform.platform.id === 5" class="ri-android-fill"></i>
                  <i v-if="platform.platform.id === 6" class="ri-apple-fill"></i>
                  <i v-if="platform.platform.id === 7" class="ri-ubuntu-fill"></i>
                  <i v-if="platform.platform.id === 8" class="ri-switch-fill"></i>
                </div>
              </div>
              <span v-if="game.metacritic" class="score w-10 h-10">{{game.metacritic}}</span>
            </div>
            <button v-if="!favoriteGames.find(g => g.id === game.id)" @click.stop="addFavorite(game)" class="w-full mt-4 btn rounded shadow-md uppercase tracking-wide px-4 py-1"><i class="ri-star-fill"></i>Add to favorites</button>
            <button v-else @click.stop="removeFavorite(game)" class="w-full mt-4 btn rounded shadow-md uppercase tracking-wide px-4 py-1"><i class="ri-star-line"></i>Remove from favorites</button>
          </div>
        </div>
      </div>
      </transition-group>
    </div>
</template>

<script>
import gsap from "gsap";

  export default {
    props: {
      games: Object,
    },
    mounted() {
      if(localStorage.getItem('favoriteGames')) {
        try {
          this.favoriteGames = JSON.parse(localStorage.getItem('favoriteGames'));
        } catch(e) {
          localStorage.removeItem('favoriteGames');
        }
      }
    },
    data() {
      return {
        favoriteGames: [],
        timer: null
      }
    },
    methods: {
      beforeEnter(el) {
        gsap.set(el, {opacity: 0, y: 40})
      },

      enter(el) {
        gsap.to(el, {opacity: 1, duration: 0.6, y: 0})
      },

      leave(el) {
        gsap.to(el, {opacity: 0, duration: 0.6, y: 40});
      },

      getGameById(id) {
        this.$store.dispatch("fetchGameById", id).then(() => {
          this.$store.commit("setModal", true);
          if(this.$store.state.showModal) {
            document.querySelector("body").style.overflowY = 'hidden';
          }
        });
      },

      addFavorite(game) {
        this.favoriteGames.push(game);
        const parsed = JSON.stringify(this.favoriteGames);
        localStorage.setItem('favoriteGames', parsed);
      },

      removeFavorite(game) {
        const filtered = this.favoriteGames.filter(g => g.id !== game.id)
        this.favoriteGames = filtered;
        const parsed = JSON.stringify(this.favoriteGames);
        localStorage.setItem('favoriteGames', parsed);
      },
    }
  }
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
}

.card {
  display: grid;
  grid-template-rows: 1fr auto;
}

.card-item {
  cursor: pointer;
  background-color: #0f3460;
}

.card-item:hover .game-name {
  color: #e94560;
}

.card-item img {
  width: 100%;
}

.game-name {
  font-family: 'SnakeJacket', sans-serif;
  color: #fcfcfc;
}

.card-item i {
  color: #fcfcfc;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.score {
  color: #20BF55;
  font-size: 1.2rem;
  font-weight: 500;
  border: 2px solid #20BF55;
  text-align: center;
  line-height: 2.1rem;
  border-radius: 50%;
}

.btn {
  background-color: #248232;
  color: #FCFCFC;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  background-color: #2CA03D
}

.btn:active, .btn:focus {
  outline: none;
}

.btn i {
  font-size: 1.2rem;
}

@media (max-width: 640px) {
  .card-container, .card {
    display: block;
  }
}
</style>