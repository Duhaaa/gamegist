<template>
  <div class="p-6 min-h-screen">
    <PageTitle title="Discover Games"/>
    <Spinner v-if="fetching"/>
    <GameList v-else :games="games" :favoriteGames="favoriteGames"/>
    <Spinner v-if="fetchingMore && !fetching"/>
    <div class="mt-20" v-if="games" v-observe-visibility="{callback: visibilityChanged}"></div>
  </div>
  <!-- Modal -->
  <Modal v-if="showModal" :game="game"/>
  <!-- -->
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import PageTitle from '../components/PageTitle';
import GameList from '../components/GameList';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';

export default {
  name: 'Home',
  components: {
    PageTitle,
    GameList,
    Spinner,
    Modal,
  },
  
  setup() {
    const store = useStore();
    const router = useRouter();
    const games = computed(() => store.state.games);
    const game = computed(() => store.state.game);
    const fetching = computed(() => store.state.fetching);
    const fetchingMore = computed(() => store.state.fetchingMore);
    const page = ref(1);
    const favoriteGames = ref([]);
    const showModal = computed(() => store.state.showModal);
    const showToast = computed(() => store.state.showToast);

    onMounted(() => {
      if (router.currentRoute.value.fullPath === "/") {
        store.commit("setGames", null);
        fetchGames();
      }
    })

    const visibilityChanged = (isVisible) => {
      if (!isVisible) return;
      page.value++;
      fetchGames();
    }

    const fetchGames = async () => {
      await store.dispatch("fetchGames", page.value);
    }

    return {
      fetchGames,
      games,
      game,
      fetching,
      page,
      visibilityChanged,
      favoriteGames,
      fetchingMore,
      showModal,
      showToast
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'SnakeJacket';
  src: url('../assets/fonts/Snake Jacket.ttf');
}
</style>