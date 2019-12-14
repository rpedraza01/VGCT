<template>
  <div id="game-form">
    <form @submit.prevent="handleSubmit">
      <label>Game Name</label>
      <input
        ref="first"
        type="text"
        :class="{ 'has-error': submitting && invalidName }"
        v-model="game.name"
        @focus="clearStatus"
        @keypress="clearStatus"
      />

      <label>Game Release Year</label>
      <input
        type="text"
        :class="{ 'has-error': submitting && invalidDate }"
        v-model="game.date"
        @focus="clearStatus"
      />

      <label>Game DB ID</label>
      <input
        type="text"
        :class="{ 'has-error': submitting && invalidGame_id }"
        v-model="game.game_id"
        @focus="clearStatus"
      />

      <p v-if="error && submitting" class="error-message">
          Please fill out all required fields
      </p>

      <p v-if="success" class="success-message">
          Game added successfully
      </p>
      <button>Add Game</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'game-form',
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            game: {
                name: '',
                date: '',
                game_id: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('add:game', this.game)
            this.$refs.first.focus()
            this.submitting = true
            this.clearStatus()

            if (this.invalidName || this.invalidDate) {
                this.error = true
                return
            }

            this.$emit('add:game', this.game)
            this.game = {
                name: '',
                date: '',
                game_id: '',
            }
            this.error = false
            this.success = false
            this.submitting = false
        },

        clearStatus() {
            this.success = false
            this.error = false
        }
    },
    computed: {
        invalidName() {
            return this.game.name === ''
        },

        invalidDate() {
            return this.game.date === ''
        },

        invalidGame_id() {
            return this.game.game_id === ''
        },
    },
}
</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }

    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color: #d33c40;
    }

    .success-message {
        color: #32a95d;
    }
</style>