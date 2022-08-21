import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';

//const baseUrl = 'http://localhost:8000/api/users';
const baseUrl = 'https://fpdf-designer.naet-tech.com/api/users';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: '/dashboard'
    }),
    actions: {
		async register(email, password, password_confirmation) {
            const response = await fetchWrapper.post(baseUrl+'/register', { email, password, password_confirmation });
			
			if(response && response.status == 200) {
				// redirect to login
				router.push('/login');
			}
        },
        async login(email, password) {
            const response = await fetchWrapper.post(baseUrl+'/login', { email, password });

			if(response && response.status == 200) {
				const user = response.data;
				
				// update pinia state
				this.user = user;

				// store user details and jwt in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));

				// redirect to previous url or default to account dashboard
				router.push(this.returnUrl || '/');
			}
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});
