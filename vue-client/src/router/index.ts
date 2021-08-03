import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		component: Home,
		path: '/',
	}
];

const router = new VueRouter({
	base: process.env.BASE_URL,
	mode: 'history',
	routes,
});

export default router;
