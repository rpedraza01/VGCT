<template>
    <div class="results">
        <form @submit.prevent="handleSubmit">
            <input style="visibility:hidden;" v-model="result.name"/>
            <h2>{{ result.name }}</h2>
            <input style="visibility:hidden;" v-model="result.id"/>
            
            <div>
                <img height="100" :alt="altText" :src="result.cover.url"/>
            </div>
            <p>{{ result.date }}</p>
            <input style="visibility:hidden;" v-model="result.release_dates[0].y"/>
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