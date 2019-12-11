<template>
    <div class="pt-5">
        <form @submit.prevent="update" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="game.name"
                    v-validate="'required'"
                    name="name"
                    placeholder="Enter name" >
                <div class="invalid-feedback">
                    <!-- :class="{'is-invalid': errors.has('game.name') && submitted}"> -->
                    Please provide a valid name.
                </div>
            </div>
            <div class="form-group">
                <label for="date">Year</label>
                <input
                    type="text"
                    class="form-control"
                    v-validate="'required'"
                    id="date"
                    v-model="game.date" 
                    name="year"
                    placeholder="Enter year" >
                <div class="invalid-feedback">
                    Please provide a valid currency.
                </div>
            </div>
            <div class="form-group">
                <label for="amount">ID</label>
                <input
                    type="number"
                    name="ID"
                    v-validate="'required'"
                    class="form-control"
                    id="ID"
                    v-model="game.game_id"
                    placeholder="Enter amount" >
                <div class="invalid-feedback">
                    <!-- :class="{'is-invalid': errors.has('game.game_id') && submitted}"> -->
                    Please provide a valid amount.
                </div>
            </div>
            <!-- <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    class="form-control"
                    id="description"
                    v-validate="'required'"
                    v-model="subscription.description"
                    cols="30"
                    rows="2"
                    :class="{'is-invalid': errors.has('subscription.description') && submitted}"></textarea>
                <div class="invalid-feedback">
                    Please provide a valid description.
                </div>
            </div> -->
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            game: {
                name: '',
                game_id: '',
                date: '',
                pk: '',
            },
            submitted: false
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/games/' + this.$route.params.id + '/')
            .then( response => {
                // console.log(response.data)
                this.game = response.data
            });
    },
    methods: {
        update: function () {  // e?
            this.$validator.validate().then(result => {
                this.submitted = true;
                if (!result) {
                    return;
                }
                axios
                    .put(`http://127.0.0.1:8000/api/games/${this.game.pk}/`,
                        this.game
                    )
                    .then(response => {
                        this.$router.push('/');
                        return response;
                    })
            });
        }
    },
}
</script>