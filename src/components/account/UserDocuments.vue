<script setup>
	import Spinner from '@/components/form/Spinner'
</script>

<template>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading saved documents..." :show-text=true />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="document in documents" :key="document.id">
			<div
			class="block rounded-lg shadow-lg">
				<img
				class="rounded-lg w-full cursor-pointer transform transition hover:scale-105 duration-300 ease-in-out"
				:src=document.thumbnail
				:alt="document.name"
				@click="initFromSource('documents', document.id)"
				/>
			</div>
		</div>
	</div>
	<button class="hidden" ref="launchOverlayModal"
	data-te-toggle="modal"
	data-te-target="#overlayModal"
	data-te-ripple-init
	data-te-ripple-color="light"
	></button>
	<overlay-modal text="Initializing design panel..." :dismiss=dismissOverlayModal />
</template>

<script>
	import createHttp from '@/axios.js'
	import OverlayModal from '@/components/form/OverlayModal.vue'
	
	export default {
		name: 'DocumentTemplates',
		components: {
			OverlayModal
		},
		data() {
			return {
				documents: [],
				isLoading: true,
				dismissOverlayModal : false
			}
		},
		mounted() {
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/documents')
				.then((response) => {
					this.isLoading = false
					this.documents = response.data
				})
		},
		methods: {
			initFromSource(source, id) {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/init/'+source+'/'+id
				this.initDesignPanel(url)
			},
			async initDesignPanel(url) {
				this.$refs.launchOverlayModal.click()
				const http = createHttp()
				http.get(url)
				.then((response) => {
					//save setup & defaults data to be used later by design panel
					localStorage.setItem('setup', JSON.stringify(response.data.setup))
					localStorage.setItem('defaults', JSON.stringify(response.data.defaults))
					
					//dismiss overlay modal
					this.dismissOverlayModal = true
					
					//redirect to design panel
					this.$router.push('/design-panel/'+response.data.id)
				})
			}
		}
	};
</script>

