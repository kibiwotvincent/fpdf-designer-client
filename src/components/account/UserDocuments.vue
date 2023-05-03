<script setup>
	import Spinner from '@/components/form/Spinner'
</script>

<template>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading saved documents..." :show-text=true />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="document in documents" :key="document.id">
		
			<div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
				<div class="px-4 py-2 border-b flex justify-between">
					<h6 class="mt-2 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50">
					  {{ document.name }}
					</h6>
					<div class="relative" data-te-dropdown-ref>
						<button
							class="flex items-center whitespace-nowrap rounded bg-neutral-50 px-4 pb-[5px] pt-[6px] text-xs font-medium leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none"
							type="button"
							id="dropdownMenuSmallButton"
							data-te-dropdown-toggle-ref
							aria-expanded="false"
							data-te-ripple-init
							data-te-ripple-color="light"
							>
							Action
							<span class="ml-2 w-2">
							  <svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-5 w-5">
								<path
								  fill-rule="evenodd"
								  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								  clip-rule="evenodd" />
							  </svg>
							</span>
						</button>
						<ul
						class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
						aria-labelledby="dropdownMenuSmallButton"
						data-te-dropdown-menu-ref
						>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								>Preview</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								>Download PHP Code</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								>Rename</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								>Delete</a>
							</li>
						</ul>
					</div>
				</div>
				<div
					class="relative overflow-hidden bg-cover bg-no-repeat"
					data-te-ripple-init
					data-te-ripple-color="light">
					<img
						class="rounded-t-lg"
						:src=document.thumbnail
						:alt="document.name" />
					<a href="#" @click.prevent="initFromSource('documents', document.id)">
						<div
							class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
					</a>
				</div>
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

