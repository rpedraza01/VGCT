import Vue from 'vue'

// For connecting to Django backend using JWT
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import router from '../router'

// For using JWT and Axios
Vue.use(VueAxios, axios)
Vue.use(Vuex)

// https://github.com/shawnstolsig/pdx_code_guild_capstone/blob/master/frontend/src/store/index.js

// https://vuex.vuejs.org/guide/

export default new Vuex.Store({
    state: {
        // for managing user logins
        authUser: {},
        isAuthenticated: false,
        // JSON web token
        jwt_access: localStorage.getItem('accessToken'),
        jwt_refresh: localStorage.getItem('refreshToken'),
        endpoints: {
            obtainJWT: 'http://localhost:8000/api/v1/token/obtain',
            refreshJWT: 'http://localhost:8000/api/v1/token/refresh',
            baseURL: 'http://localhost:8000/api/v1',
        }
    }, // end Vuex state
    mutations: {
        // Login: set the authenticated user state
        setAuthUser(state,{
            authUser,
            isAuthenticated
        }){
            Vue.set(state, 'authUser', authUser)
            Vue.set(state, 'isAuthenticated', isAuthenticated)
        },
        // logout: null authenticated user in state
        unsetAuthUser(state){
            Vue.set(state, 'authUser', {});
            Vue.set(state, 'isAuthenticated', false)
        },
        // update local storage and Vuex state with new JWT
        updateToken(state, newToken) {
            if(newToken.access){
                localStorage.setItem('accessToken', newToken.access);
                state.jwt_access = newToken.access;
            }
            if(newToken.refresh){
                localStorage.setItem('refreshToken', newToken.refresh);
                state.jwt_refresh = newToken.refresh;
            }
        },
        // remove JWT from local Vuex storage and state
        removeToken(state) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.jwt_access = null;
            state.jwt_refresh = null;
        }
    }, //end of Vuex mutations
    actions: {
        // use Axios to get new JWT, provided username and password payload
        obtainToken(context, payload) {
            // get tokens and update user information (payload is username and password)
            axios.post(this.state.endpoints.obtainJWT, payload)
                .then(response => {
                    // update
                    this.commit('updateToken', response.data);
                    // set state information for logged in user
                    const token = response.data.access
                    if (token) {
                        // use jwt_decode library to extract user_id from JWT
                        const decoded = jwt_decode(token);
                        const user_id = decoded.user_id
                        // send user_id next axios call, to pull User info from API
                        return axios({
                            method: 'get',
                            url: `${this.state.endpoints.baseURL}/users/${user_id}`,
                            headers: {
                                authorization: `Bearer ${response.data.access}`
                            }
                        })
                    } else {
                        alert("Trying to decode user from access token but no token found!")
                    }
                })
                // set user information
                .then(response => {
                    this.commit('setAuthUser', {
                        // in Vuex store, add user information retrieved from API
                        authUser: {
                            user_id: response.data.id,
                            username: response.data.username,
                            last_login: response.data.last_login,
                            first_name: response.data.first_name,
                            last_name: response.data.last_name,
                            is_active: response.data.is_active,
                            date_joined: response.data.date_joined,
                        },
                        isAuthenticated: true,
                    })
                    // redirect user to Dashboard
                    router.push({name:'home'})
                }).catch((error) => {
                    console.log(error);
                    alert("Error obtaining token and user information")
                })
        },
        // delete stored token, both in localStorage and state
        deleteToken() {
            this.commit("removeToken")
            this.commit("unsetAuthUser")
            router.push({name: "login"})
        },
        // use Axios to refresh existing JWT (no username/password needed with refresh, just refresh token)
        refreshToken() {
            const payload = {
                refresh: this.state.jwt_refresh
            }
            axios.post(this.state.endpoints.refreshJWT, payload)
                .then((response) => {
                    this.commit('updateToken', response.data)
                })
                .catch((error) => {
                    console.log(error)
                    alert("Error freshing access token...make sure refresh token passed to backend!")
                })
        },
        // verify JWT is valid. Prompt user if they need to login again
        inspectToken() {
            const token = this.state.jwt_access;
            if (token) {
                const decoded = jwt_decode(token);
                const exp = decoded.exp
                const orig_iat = decoded.orig_iat
                if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
                    this.dipatch("refreshToken")
                    alert("token inspected, refreshing token")
                } else if (exp - (Date.now() / 1000) < 1800) {
                    // DO NOTHING DO NOT REFRESH
                    alert("token inspected no issues")
                } else {
                    // PROMPT USER TO RELOGIN
                    // THIS ELSE CLAUSE COVERS THEN CONDITION WHERE A TOKEN IS EXPIRED
                    alert("Authentication token expired, please login again")
                    router.push({name: 'login'})
                }
            }
            else {
                alert("No token detected")
            }
        }
    }, // end Vuex actions
    modules: {
        // end Vuex modules
    }
})