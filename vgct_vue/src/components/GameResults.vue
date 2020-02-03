<template>
    <div class="results">
        <form @submit.prevent="handleSubmit">
            <h2>{{ result.name }}</h2>
            <div>
                <a href="result.url"><img height="100" :alt="altText"  :src="result.cover.url"/></a>
            </div>
            <p>{{ result.release_dates[0].y }}</p>
            <p>{{ result.genres.name }}</p>
            <p>{{ result.total_rating }}</p>
            <p>{{ result.involved_companies[0].company.name }}</p>
            <!-- <p v-for="c in result.involved_companies" :key="c.id">
                {{ c.company.name }}
            </p> -->
            <div style="visibility:hidden;">
                <input v-model="result.id"/>
                <input v-model="result.name"/>
                <input v-model="result.release_dates[0].y"/>
                <input v-model="result.summary"/>
                <input v-model="result.total_rating"/>
                <input v-model="result.cover.url"/>
                <input v-model="result.url"/>
            </div>
            <br>
            <button>Add Game</button>
        </form>
    </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
    name: "Results",
    props: ['result'],
    setup({ result }) {
        const altText = computed(() => `The Game Titled: ${result.name}`);

        return { altText };
    },
    methods: {
        handleSubmit() {
            let game = {
                name: this.result.name,
                game_id: this.result.id,
                date: this.result.release_dates[0].y,
                summary: this.result.summary,
                rating: this.result.total_rating,
                cover: this.result.cover.url,
                url: this.result.url,
            }
            this.$emit('add:game', game)
            // this.$refs.first.focus()
            this.submitting = true
            this.clearStatus()

            if (this.invalidName || this.invalidDate) {
                this.error = true
                return
            }

            // this.$emit('add:game', this.game)
            this.error = false
            this.success = false
            this.submitting = false
            return game
        },

        clearStatus() {
            this.success = false
            this.error = false
        }
    },
    // alert(props)
};

</script>