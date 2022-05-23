import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
	key: 'vejce',
	storage: window.localStorage,
	reducer: state => ({
		token: state.auth,
	}),
});

export default new Vuex.Store({
	state: {
		token: '',
		user: {},
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
		},
		resetToken(state) {
			state.token = '';
		},
		setUser(state, user) {
			state.user = user;
		},
		resetUser(state) {
			state.user = {};
		},
	},
	actions: {},
	modules: {},
	plugins: [vuexLocalStorage.plugin],
});
