<template>
    <div class="results">
        <h2>{{ result.name }}</h2>
        <div>
            <img width="200" :alt="altText" :src="result.name"/>
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