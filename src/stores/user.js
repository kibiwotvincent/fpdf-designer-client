import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => {
    return {
      authenticated: false,
    }
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    login() {
	this.authenticated = true;
	console.log(this.authenticated);
    },
	
	logout() {
	this.authenticated = false;
	console.log(this.authenticated);
    },
  }
})