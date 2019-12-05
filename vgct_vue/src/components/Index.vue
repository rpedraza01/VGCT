<template>
    <div class="pt-5">
        <div v-if="games && games.length">
            <div class="card mb-3" v-for="game of games" v-bind:key="game.id">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <svg class="bd-placeholder-img" width="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>{{ game.name }}</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">{{ game.name.charAt(0) }}</text></svg>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ game.name }}</h5>
                            <!-- <p class="card-text">{{ game.description }}</p> -->
                            <router-link :to="{name: 'edit', params: { id: game.id }}" class="btn btn-sm btn-primary">Edit</router-link>
                            <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteGame(game)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p  v-if="games.length == 0">No games</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            games: []
        }
    },
    created() {
        this.all();
    },
    methods: {
        deleteGame: function(g) {
            if (confirm('Delete ' + g.name)) {
                axios.delete(`http://127.0.0.1:8000/api/games/${g.id}`)
                    .then( response => {
                        this.all();
                    });
            }
        },
        all: function () {
            axios.get('http://127.0.0.1:8000/api/games/')
                .then( response => {
                    this.games = response.data
                });
        }
    },
}
</script>