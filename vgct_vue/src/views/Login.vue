<template>
    <form>
        <label for="id_username">Username</label>
        <input
            v-model= "username"
            type="text"
            placeholder="Username"
            autofocus="autofocus"
            maxlength="150"
            id="id_username"
        />
        <label for="id_password">Password</label>
        <input
            v-model="password"
            type="password"
            placeholder="password"
            id="id_password"
        />
        <button
            @click.prevent="authenticate"
            type="submit">
            Login
        </button>
    </form>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        authenticate() {
            const payload = {
                username: this.username,
                password: this.password
            }
            this.$store.dispatch("obtainToken", payload);
        }
    }
}
</script>