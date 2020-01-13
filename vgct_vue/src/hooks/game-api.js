import { reactive, watch } from '@vue/composition-api';
// const API_KEY = '';

export const useGameAPI = () => {
    const state = reactive({
        search: '',
        loading: true,
        results: []
    });

    watch(() => {
        const GAME_API_URL = `http://127.0.0.1:8000/api/igdb_api/`;

        // alert(JSON.stringify(
        //     {
        //         title: state.search,
        //         game_id: "",
        //         date: ""
        //     },
        // ));

        fetch(GAME_API_URL, {
            method: "POST",
            body: JSON.stringify({title: state.search, game_id: "", date: ""}, null, 0).replace(/\n/g,"").replace(/:/g, ": "),
        })
            .then(response => response.json())
            .then(jsonResponse => {
                state.results = jsonResponse;
                // alert(jsonResponse.GameSearch);
                state.loading = false;
            });
    });

    return state;
};