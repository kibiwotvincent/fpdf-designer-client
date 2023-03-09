import {createRouter, createWebHistory} from 'vue-router';
//import pinia from "@/store.js";
import { useAuthStore } from '@/stores';

import Home from '@/views/Homepage.vue';
import DesignPanel from '@/views/DesignPanel.vue';
import ChooseTemplate from '@/views/ChooseTemplate.vue';
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
	{path: '/document/choose-template', name: 'choose-template', component: ChooseTemplate},
	{path: '/pricing', name: 'pricing', component: Pricing},
	{path: '/help', name: 'help', component: Help},
	{path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicy},
	{path: '/contact-us', name: 'contact-us', component: ContactUs},
	{path: '/login', name: 'login', component: Login},
	{path: '/register', name: 'register', component: Register},
	{path: '/forgot-password', name: 'forgot-password', component: ForgotPassword},
	{path: '/dashboard', name: 'dashboard', component: Dashboard},
	{path: '/profile', name: 'profile', component: Profile},
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/login', '/register', '/forgot-password', '/pricing', '/help', '/privacy-policy', '/contact-us'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
})

