import {createRouter, createWebHistory} from 'vue-router';
import store from '@/store/';

import Home from '@/views/Homepage.vue';
import DesignPanel from '@/views/DesignPanel.vue';
import Pricing from '@/views/Pricing.vue';
import Help from '@/views/Help.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import ContactUs from '@/views/ContactUs.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import Dashboard from '@/views/account/Dashboard.vue';
import Profile from '@/views/account/Profile.vue';

const routes = [
	{path: '/', name: 'home', component: Home},
	{path: '/design-panel', name: 'design-panel', component: DesignPanel},
	{path: '/pricing', name: 'pricing', component: Pricing},
	{path: '/help', name: 'help', component: Help},
	{path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicy},
	{path: '/contact-us', name: 'contact-us', component: ContactUs},
	{
		path: '/login', 
		name: 'login', 
		component: Login,
		beforeEnter: (to, from, next) => {
			if(store.state.authenticated == true) {
				next("/dashboard");
			}
			next();
		}
	},
	{path: '/register', name: 'register', component: Register},
	{path: '/forgot-password', name: 'forgot-password', component: ForgotPassword},
	{
		path: '/dashboard', 
		name: 'dashboard', 
		component: Dashboard,
		beforeEnter: (to, from, next) => {
			if(store.state.authenticated == false) {
				next("/login");
			}
			else {
				next();
			}
		}
	},
	{
		path: '/profile', 
		name: 'profile', 
		component: Profile,
		beforeEnter: (to, from, next) => {
			if(store.state.authenticated == false) {
				next("/login");
			}
			else {
				next();
			}
		}
	},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
