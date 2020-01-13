<template>
    <div class="results">
        <h2>{{ result.name }}</h2>
        <div>
            <img height="100" :alt="altText" :src="result.cover.url"/>
        </div>
        <p>{{ result.date }}</p>
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
    // alert(props)
};

</script>