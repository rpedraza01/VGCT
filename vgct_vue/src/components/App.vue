<template>
  <div id="app" class="small-container">
    <h1>Games</h1>
    <GameSearch :search="state.search" @search="handleSearch" />

    <div class="results">
      <GameResults v-for="result in state.results.games" :result="result" :key="result.id" @add:game="addGame" />
    </div>

    <!-- <game-form :games="games" @add:game="addGame" />

    <game-table :games="games" @delete:game="deleteGame" @edit:game="editGame" /> -->
  </div>
</template>

<script>
// import{ reactive, watch } from '@vue/composition-api';
// import GameTable from "./GameTable.vue";
// import GameForm from "./GameForm.vue";
import GameSearch from "./GameSearch.vue";
import GameResults from "./GameResults.vue";
import { useGameAPI } from '../hooks/game-api';

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default {
  name: "app",
  components: {
    // GameTable,
    // GameForm,
    GameSearch,
    GameResults,
  },  
  setup(){
    const state = useGameAPI();
    
    return {
      state,
      handleSearch(queryText) {
        state.loading = true;
        state.search = queryText;
      }
    };
    // reactive({
    //   search: "",
    //   loading: true,
    //   gameResults: [],
    //   errorMessage: null
    // })

    // watch(() => {
    //   const
    // })
  
  },

  data() {
    return {
      games: []
    };
  },

  mounted() {
    this.getGames();
  },

  methods: {
    async getGames() {
      // try {
      const response = await fetch("http://127.0.0.1:8000/api/games/");
      const data = await response.json();
      this.games = data;
      // } catch (error) {}
    },

    async addGame(game) {
      // try {
      var csrftoken = getCookie("csrftoken");
      const response = await fetch("http://127.0.0.1:8000/api/games/", {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // "Access-Control-Allow-Headers": "POST",
          "X-CSRFToken": csrftoken
        }
      });
      const data = await response.json();
      alert("Game Added!")
      this.games = [...this.games, data];
      // } catch (error) {}
    },

    async editGame(pk, updatedGame) {
      // try {
      const response = await fetch(`http://127.0.0.1:8000/api/games/${pk}/`, {
        method: "PUT",
        body: JSON.stringify(updatedGame),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      const data = await response.json();
      this.games = this.games.map(game => (game.pk === pk ? data : game));
      // } catch (error) {}
    },

    async deleteGame(pk) {
      // try {
      await fetch(`http://127.0.0.1:8000/api/games/${pk}/`, {
        method: "DELETE"
      });
      this.games = this.games.filter(game => game.pk !== pk);
      // } catch (error) {}
    }
  }
};
</script>

<style scoped>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 680px;
}
</style>