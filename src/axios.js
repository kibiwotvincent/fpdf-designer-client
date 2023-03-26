import axios from 'axios';
import { useAuthStore } from '@/stores';

export default function createHttp() {
	const user = useAuthStore()
	
	if(user.token !== '') {
		return axios.create({
			headers: { "Authorization": `Bearer ${user.token}` }
		});
	}
	else {
		return axios.create();
	}
}