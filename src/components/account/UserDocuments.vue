<script setup>
	import Spinner from '@/components/form/Spinner'
	import Alert from '@/components/common/Alert'
	import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-4 text-gray-700 text-sm font-semibold uppercase">
			Saved Documents
		</div>
		<router-link to="/document/choose-template">
			<button class="bg-red-400 hover:underline text-white rounded py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<PlusIcon class="inline-block h-5 w-5 mb-1"/>
				Create New Document
			</button>
		</router-link>
	</div>
	
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading saved documents..." :show-text=true />
	</div>
	
	<div v-if="isLoading === false && documents.length === 0">
		<Alert type="warning" message="No saved documents to display yet!" />
	</div>
	
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="(document, index) in documents" :key="document.id">
		
			<div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
				<div class="px-4 py-2 border-b flex justify-between">
					<h6 class="mt-2 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50">
					{{ document.name }}
					</h6>
					<div class="relative" data-te-dropdown-ref>
						<button
							class="flex items-center whitespace-nowrap rounded bg-neutral-50 px-4 pb-[5px] pt-[6px] text-s font-medium leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none"
							type="button"
							:id="'actionMenu'+index"
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
						:aria-labelledby="'actionMenu'+index"
						data-te-dropdown-menu-ref
						>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								@click.prevent="viewPdf(document.id)"
								>View Pdf</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								@click.prevent="rename(document, index)"
								>Rename</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								@click.prevent="deleteDocument(document, index)"
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
	
	<button class="hidden" ref="launchRenameDocumentModal"
	data-te-toggle="modal"
	data-te-target="#renameDocumentModal"
	data-te-ripple-init
	data-te-ripple-color="light"
	></button>
	<rename-document-modal 
	:id=documentToRename.id 
	:name=documentToRename.name 
	:index=documentToRename.index
	@renamed="documentRenamed"	
	/>
	
	<button class="hidden" ref="launchDeleteDocumentModal"
	data-te-toggle="modal"
	data-te-target="#deleteDocumentModal"
	data-te-ripple-init
	data-te-ripple-color="light"
	></button>
	<delete-document-modal 
	:id=documentToDelete.id 
	:name=documentToDelete.name 
	:index=documentToDelete.index
	@deleted="documentDeleted"	
	/>
</template>

<script>
	import createHttp from '@/axios.js'
	import OverlayModal from '@/components/form/OverlayModal.vue'
	import RenameDocumentModal from '@/components/modals/RenameDocumentModal.vue'
	import DeleteDocumentModal from '@/components/modals/DeleteDocumentModal.vue'
	
	
	export default {
		name: 'DocumentTemplates',
		components: {
			OverlayModal
		},
		data() {
			return {
				documents: [],
				isLoading: true,
				dismissOverlayModal: false,
				documentToRename: {},
				documentToDelete: {}
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
			},
			async viewPdf(documentID) {
				const url = process.env.VUE_APP_API_URL+'/api/documents/'+documentID+'/view-pdf'
				const http = createHttp({responseType: 'blob'})
				http.get(url)
				.then((response) => {
					var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
					var fileLink = document.createElement('a');
					fileLink.href = fileURL;
					fileLink.setAttribute('download', documentID+'.pdf');
					document.body.appendChild(fileLink);
					fileLink.click();
				});
			},
			rename(document, index) {
				this.documentToRename.id = document.id
				this.documentToRename.name = document.name
				this.documentToRename.index = index
				this.$refs.launchRenameDocumentModal.click()
			},
			documentRenamed(document) {
				this.documents[document.index]['name'] = document.name 
			},
			deleteDocument(document, index) {
				this.documentToDelete.id = document.id
				this.documentToDelete.name = document.name
				this.documentToDelete.index = index
				this.$refs.launchDeleteDocumentModal.click()
			},
			documentDeleted(document) {
				this.documents.splice(document.index, 1)
			}
		}
	};
</script>

