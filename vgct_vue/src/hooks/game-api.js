import { reactive, watch } from '@vue/composition-api';
// const API_KEY = '';

export const useGameAPI = () => {
    const state = reactive({
        search: '',
        loading: true,
        games: []
    });

    watch(() => {
        const GAME_API_URL = `http://127.0.0.1:8000/api/igdb_api/`;

        fetch(GAME_API_URL, {
            method: "POST",
            body: JSON.stringify(
                {
                    "title": state.search,
                    "game_id": "",
                    "date": ""
                },
            ),
        })
            .then(response => response.json())
            .then(jsonResponse => {
                state.games = jsonResponse.Search;
                state.loading = false;
            });
    });

    return state;
};