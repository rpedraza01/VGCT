<template>
    <div class="results">
        <h2>{{ results }}</h2>
        <div>
            <img width="200" :alt="altText" :src="results.name"/>
        </div>
        <p>{{ results.date }}</p>
    </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
    name: "Results",
    props: ['results'],
    setup({ results }) {
        const altText = computed(() => `The Game Titled: ${results.name}`);

        return { altText };
    },
    // alert(props)
};

</script>