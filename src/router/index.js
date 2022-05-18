import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Products from '../views/Products.vue';
import Users from '../views/Users.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		alias: ['/tabule'],
		name: 'Dashboard',
		component: Dashboard,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/produkty',
		name: 'Products',
		component: Products,
	},
	{
		path: '/uzivatele',
		name: 'Users',
		component: Users,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
