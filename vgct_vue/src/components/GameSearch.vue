<template>
    <div id="search-bar">
        <form class="search">
            <input 
                type="text"
                :value="queryText"
                @keyup="handleChange"
            />
            <input @click="handleSubmit" type="submit" value="SEARCH" />        
        </form>
    </div>

</template>

<script>
import { ref } from '@vue/composition-api';

export default {
    name: 'Search',
    props: ['search'],
    setup({ search }, { emit }) {
        const queryText = ref(search);

        return {
            queryText,
            handleSubmit(event) {
                event.preventDefault();
                emit('search', queryText.value);
            },
            handleChange(event) {
                queryText.value = event.target.value
            }
        }
    }
};
</script>