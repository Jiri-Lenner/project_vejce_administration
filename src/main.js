import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import IdleVue from 'idle-vue';

Vue.config.productionTip = false;

const eventsHub = new Vue();

const options = {
	eventEmitter: eventsHub,
	idleTime: 600000,
};

Vue.use(IdleVue, options);

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
