import authServices from "@/services/auth.services";

const user = JSON.parse(localStorage.getItem("userdata"));
const initState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: false,
    state: initState,
    actions: {
        async login({ commit }, user) {
            console.log("login action called");
            return authServices.login(user).then(
                user => {
                    commit("loginSuccess", user);
                    return Promise.resolve(user);
                },
                error => {
                    commit("loginFailed");
                    return Promise.reject(error);
                }
            )
        },
        async verifyTFA({ commit }, data) {
            return authServices.verifyTFA(data).then(
                user => {
                    commit("loginSuccess", user);
                    return Promise.resolve(user);
                },
                error => {
                    commit("loginFailed");
                    return Promise.reject(error);
                }
            )
        },
        logout({ commit }) {
            authServices.logout();
            commit("logout");
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailed(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    }
}