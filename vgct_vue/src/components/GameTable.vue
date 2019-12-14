<template>
    <div id="employee-table">
        <p v-if="games.length < 1" class="empty-table">
            No Games
        </p>
        <table v-else>
            <thead>
                <tr>
                    <th>Game Name</th>
                    <th>Release Year</th>
                    <th>Game DB ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in games" :key="game.pk">
                    <td v-if="editing === game.pk">
                        <input type="text" v-model="game.name"/>
                    </td>
                    <td v-else>{{game.name}}</td>

                    <td v-if="editing === game.pk">
                        <input type="text" v-model="game.date"/>
                    </td>
                    <td v-else>{{game.date}}</td>

                    <td v-if="editing === game.pk">
                        <input type="text" v-model="game.game_id"/>
                    </td>
                    <td v-else>{{game.game_id}}</td>

                    <td v-if="editing === game.pk">
                        <button @click="editGame(game)">Save</button>
                        <button class="muted-button" @click="editing = null">Cancel</button>
                    </td>

                    <td v-else>
                        <button @click="editMode(game.pk)">Edit</button>
                        <button @click="$emit('delete:game', game.pk)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'game-table',
    props: {
        games: Array,
    },

    data() {
        return {
            editing: null,
        }
    },

    methods: {
        editMode(pk) {
            this.editing = pk
        },

        editGame(game) {
            if (game.name === '' || game.date === '') return
            this.$emit('edit:game', game.pk, game)
            this.editing = null
        },

        cancelEdit(game) {
            Object.assign(game, this.cachedGame)
            this.editing = null;
        }
    }
}
</script>

<style scoped>
    button {
        margin: 0.5rem;
    }
</style>