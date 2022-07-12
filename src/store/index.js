import { createStore } from 'vuex'

//create new store instance
const store = createStore(
	{
		state () {
			return {
				authenticated: false
			}
		},
		mutations: {
			setAuthentication(state, status) {
				state.authenticated = status;
				console.log(state.authenticated);
			}
		}
	}
);

export default store;