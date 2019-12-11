<template>
    <div class="pt-5">
        <form @submit.prevent="create" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="game.name"
                    v-validate="'required'"
                    name="name"
                    placeholder="Enter name">
                    <!-- :class="{'is-invalid': errors.has('game.name') && submitted}"> -->
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
                <label for="id">ID</label>
                <input
                    type="text"
                    class="form-control"
                    id="id"
                    v-model="game.game_id"
                    v-validate="'required'"
                    name="id"
                    placeholder="Enter id">
                    <!-- :class="{'is-invalid': errors.has('game.name') && submitted}"> -->
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
            </div>
            <div class="form-group">
                <label for="date">Year</label>
                <textarea
                    name="date"
                    class="form-control"
                    id="date"
                    v-validate="'required'"
                    v-model="game.date"
                    cols="30"
                    rows="2">
                    <!-- :class="{'is-invalid': errors.has('game.date') && submitted}"> -->
                    </textarea>
                <div class="invalid-feedback">
                    Please provide a valid description.
                </div>
            </div>
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
            },
            submitted: false
        }
    },
    methods: {
        create: function () { // e?
            this.$validator.validate().then(result => {
                this.submitted = true;
                if (!result) {
                    return;
                }
                // console.log(this.date)
                axios
                    .post('http://127.0.0.1:8000/api/games/',
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