import axios from 'axios';
import { useAuthStore } from '@/stores';

export default function createHttp(config = {}) {
	const user = useAuthStore()
	
	if(user.token !== '') {
		const headers = {}
		headers.Authorization = `Bearer ${user.token}`
		config.headers = headers
	}
	
	return axios.create(config)
}
export function http(config = {}) {
	const user = useAuthStore()
	
	if(user.token !== '') {
		const headers = {}
		headers.Authorization = `Bearer ${user.token}`
		config.headers = headers
	}
	
	return axios.create(config)
}
export function url(slug) {
    return process.env.VUE_APP_API_URL+slug
}