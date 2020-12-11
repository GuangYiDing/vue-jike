import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        emojiList: { acList: [], aluList: [] },
    },
    plugins: [createPersistedState()],
    mutations: {
        setToken: (state, token) => { state.token = token },
        setAcList: (state, palyload) => { state.emojiList.acList = palyload.acList },
        setAluList: (state, palyload) => { state.emojiList.aluList = palyload.aluList },
    },
    getters: {
        acList: state => {
            return state.emojiList.acList
        },
        aluList: state => {
            return state.emojiList.aluList
        },
        token: state => {
            return state.token
        }
    }
});

export default store;
