<script setup>
	import Spinner from '@/components/form/Spinner'
</script>

<template>
    <div class="flex justify-between">
		<h2 class="w-full text-2xl font-bold text-gray-800">
			Saved documents
		</h2>
	</div>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading saved documents..." :show-text=true />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="document in documents" :key="document.uuid">
			<div
			class="block rounded-lg shadow-lg">
			<router-link :to="'/design-panel/documents/'+document.uuid">
				<img
				class="rounded-lg w-full transform transition hover:scale-105 duration-300 ease-in-out"
				src="http://localhost:8080/1.PNG"
				:alt="document.uuid" />
			</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import createHttp from '@/axios.js'
	
	export default {
		name: 'DocumentTemplates',
		data() {
			return {
				documents: [],
				isLoading: true
			}
		},
		mounted() {
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/documents')
				.then((response) => {
					this.isLoading = false
					this.documents = response.data
				})
		}
	};
</script>

