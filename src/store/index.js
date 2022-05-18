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
	},
	mutations: {},
	actions: {},
	modules: {},
	plugins: [vuexLocalStorage.plugin],
});
