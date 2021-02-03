import { createStore } from 'vuex'
import axios from 'axios';

let baseUrl = `https://api.rawg.io/api/games`;

export default createStore({
  state: {
    games: [],
    game: [],
    fetching: true,
    fetchingMore: true,
    showModal: false,
    showToast: false,
    query: ""
  },
  mutations: {
    setGames(state, games) {
      state.games = games;
    },
    setMoreGames(state, games) {
      state.games.push(...games);
    },
    setGame(state, game) {
      state.game = game;
    },
    setFetching(state, fetching) {
      state.fetching = fetching;
    },
    setFetchingMore(state, fetchingMore) {
      state.fetchingMore = fetchingMore;
    },
    setModal(state, showModal) {
      state.showModal = showModal;
    },
    setToast(state, showToast) {
      state.showToast = showToast;
    },
    setQuery(state, query) {
      state.query = query;
    }
  },
  actions: {
    //Fetch games
    async fetchGames({commit}, page) {
      if (page > 1) {
        commit("setFetchingMore", true)
      }
      await axios.get(baseUrl, {
        params: {
          key: process.env.VUE_APP_API_KEY,
          page: page,
          dates: '2020-01-01,2021-12-31',
          ordering: '-added',
        }
      }).then((res) => {
        if(page === 1) {
          commit("setGames", res.data.results);
          commit("setFetching", false)
        } else {
          commit("setMoreGames", res.data.results);
          commit("setFetchingMore", false)
        }
      });
    },
    //Fetch single game
    async fetchGameById({commit}, id) {
      await axios.get(baseUrl + '/' + id, {
        params: {
          key: process.env.VUE_APP_API_KEY
        }
      }).then((res) => {
        commit("setGame", res.data);
      })
    },
    //Fetch games by search query
    async fetchGamesByQuery({commit}, query) {
      commit("setFetching", true)
      await axios.get(baseUrl, {
        params: {
          key: process.env.VUE_APP_API_KEY,
          search: query,
          search_precies: false,
          search_exact: false
        }
      }).then((res) => {
        commit("setGames", res.data.results);
        commit("setFetching", false)
      })
    }
  },
  modules: {
  }
})
