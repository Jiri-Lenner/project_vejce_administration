import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
	key: 'vejce',
	storage: window.localStorage,
	reducer: state => ({
		token: state.token,
		userId: state.userId,
	}),
});

export default new Vuex.Store({
	state: {
		token: '',
		user: {},
		userId: '',

		// app
	},
	mutations: {
		// token
		setToken(state, token) {
			state.token = token;
		},
		resetToken(state) {
			state.token = '';
		},
		// user
		setUser(state, user) {
			state.user = user;
			state.userId = user._id;
		},
		resetUser(state) {
			state.user = {};
		},
		// TODO => namespaced store + vuex modules
		// vuex getters + actions only
		// mutations always get called by actions only
	},
	actions: {},
	modules: {},
	plugins: [vuexLocalStorage.plugin],
});
