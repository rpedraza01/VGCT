<template>
    <div class="game">
        <h2>{{ game.name }}</h2>
        <div>
            <img width="200" :alt="altText" :src="game.name"/>
        </div>
        <p>{{ game.date }}</p>
    </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
    name: "Game",
    props: ['game'],
    setup({ game }) {
        const altText = computed(() => `The Game Titled: ${game.name}`);

        return { altText };
    }
};
</script>