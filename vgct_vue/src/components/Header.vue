<template>
    <header class="App-header">
        <h2> {{ title }}</h2>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: ['title'],
    setup() {}
}
</script>