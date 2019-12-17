<template>
  <div id="app" class="small-container">
    <h1>Games</h1>

    <game-form :games="games" @add:game="addGame" />

    <game-table :games="games" @delete:game="deleteGame" @edit:game="editGame" />
  </div>
</template>

<script>
import GameTable from "@/components/GameTable.vue";
import GameForm from "@/components/GameForm.vue";

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
    GameTable,
    GameForm
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