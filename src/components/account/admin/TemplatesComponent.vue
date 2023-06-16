<script setup>
	import Spinner from '@/components/form/Spinner'
	import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-4 text-gray-700 text-sm font-semibold uppercase">
			Templates
		</div>
		<button 
		class="bg-red-400 hover:underline text-white rounded py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
		@click="initFromScratch"
		>
			<PlusIcon class="inline-block h-5 w-5 mb-1"/>
			Create New Template
		</button>
	</div>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading saved templates..." :show-text=true />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="(template, index) in templates" :key="template.id">
		
			<div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
				<div class="px-4 py-2 border-b flex justify-between">
					<h6 class="mt-2 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50">
					{{ template.name }}
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
								@click.prevent="viewPdf(template.id)"
								>View Pdf</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								@click.prevent="rename(template, index)"
								>Rename</a>
							</li>
							<li>
								<a
								class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
								href="#"
								data-te-dropdown-item-ref
								@click.prevent="deleteTemplate(template, index)"
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
						:src=template.thumbnail
						:alt="template.name" />
					<a href="#" @click.prevent="initFromSource('templates', template.id)">
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
	
	<button class="hidden" ref="launchRenameTemplateModal"
	data-te-toggle="modal"
	data-te-target="#renameTemplateModal"
	data-te-ripple-init
	data-te-ripple-color="light"
	></button>
	<rename-template-modal 
	:id=templateToRename.id 
	:name=templateToRename.name 
	:index=templateToRename.index
	@renamed="templateRenamed"	
	/>
	
	<button class="hidden" ref="launchDeleteTemplateModal"
	data-te-toggle="modal"
	data-te-target="#deleteTemplateModal"
	data-te-ripple-init
	data-te-ripple-color="light"
	></button>
	<delete-template-modal 
	:id=templateToDelete.id 
	:name=templateToDelete.name 
	:index=templateToDelete.index
	@deleted="templateDeleted"	
	/>
</template>

<script>
	import createHttp from '@/axios.js'
	import OverlayModal from '@/components/form/OverlayModal.vue'
	import RenameTemplateModal from '@/components/modals/admin/RenameTemplateModal.vue'
	import DeleteTemplateModal from '@/components/modals/admin/DeleteTemplateModal.vue'
	
	export default {
		name: 'TemplatesComponent',
		components: {
			OverlayModal
		},
		data() {
			return {
				templates: [],
				isLoading: true,
				dismissOverlayModal: false,
				templateToRename: {},
				templateToDelete: {}
			}
		},
		mounted() {
			const http = createHttp()
			http.get(process.env.VUE_APP_API_URL+'/api/admin/templates')
				.then((response) => {
					this.isLoading = false
					this.templates = response.data
				})
		},
		methods: {
			initFromScratch() {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/init/blank/template'
				this.initDesignPanel(url)
			},
			initFromSource(source, id) {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/init/'+source+'/'+id+'/template'
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
			async viewPdf(templateID) {
				const url = process.env.VUE_APP_API_URL+'/api/admin/templates/'+templateID+'/view-pdf'
				const http = createHttp({responseType: 'blob'})
				http.get(url)
				.then((response) => {
					var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
					var fileLink = document.createElement('a');
					fileLink.href = fileURL;
					fileLink.setAttribute('download', templateID+'.pdf');
					document.body.appendChild(fileLink);
					fileLink.click();
				});
			},
			rename(template, index) {
				this.templateToRename.id = template.id
				this.templateToRename.name = template.name
				this.templateToRename.index = index
				this.$refs.launchRenameTemplateModal.click()
			},
			templateRenamed(template) {
				this.templates[template.index]['name'] = template.name 
			},
			deleteTemplate(template, index) {
				this.templateToDelete.id = template.id
				this.templateToDelete.name = template.name
				this.templateToDelete.index = index
				this.$refs.launchDeleteTemplateModal.click()
			},
			templateDeleted(template) {
				this.templates.splice(template.index, 1)
			}
		}
	};
</script>

