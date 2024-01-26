<script setup>
	import Spinner from '@/components/form/Spinner'
	import { PlusIcon,ChevronDownIcon } from '@heroicons/vue/20/solid'
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { useDocumentModalStore } from '@/stores'
    import Alert from '@/components/common/Alert'
    const modalStore = useDocumentModalStore()
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
    <div v-if="isLoading === false && templates.length === 0">
		<Alert type="warning" message="No saved templates to display yet!" />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="(template, index) in templates" :key="template.id">
		
			<div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
				<div class="px-4 py-2 border-b flex justify-between">
					<h6 class="mt-2 text-l font-medium leading-tight text-neutral-700">
					{{ template.name }}
					</h6>
					<div class="relative">
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                              <MenuButton class="inline-flex items-center whitespace-nowrap rounded bg-neutral-50 px-4 pb-[5px] pt-[6px] text-s font-medium leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none"	>						
                                  Action
                                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                              </MenuButton>
                            </div>

                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                              <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="py-1">
                                  <MenuItem v-slot="{ active }" @click="viewPdf(template.id)">
                                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Pdf</a>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }" @click="launchModal('RenameTemplate'+index)">
                                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Rename</a>
                                    </MenuItem>
                                  <MenuItem v-slot="{ active }" @click="launchModal('DeleteTemplate'+index)">
                                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </transition>
                          </Menu>
                          <rename-template-modal 
                            :id=template.id 
                            :name=template.name 
                            :index=index
                            @renamed="templateRenamed"	
                            v-if="modalStore.name == 'RenameTemplate'+index"
                            />
                          <delete-template-modal 
                            :id=template.id 
                            :name=template.name 
                            :index=index
                            @deleted="templateDeleted"	
                            v-if="modalStore.name == 'DeleteTemplate'+index"
                            />
                        
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
	<overlay-modal text="Initializing design panel..." v-if="modalStore.name == 'InitializingDesignPanel'" />
</template>

<script>
	import createHttp from '@/axios.js'
	import OverlayModal from '@/components/form/SpinnerModal.vue'
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
            launchModal(modalName) {
                const modalStore = useDocumentModalStore()
				modalStore.show(modalName)
            },
			initFromScratch() {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/init/blank/template'
				this.initDesignPanel(url)
			},
			initFromSource(source, id) {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/init/'+source+'/'+id+'/template'
				this.initDesignPanel(url)
			},
			async initDesignPanel(url) {
				this.launchModal('InitializingDesignPanel')
				const http = createHttp()
				http.get(url)
				.then((response) => {
					//save setup & defaults data to be used later by design panel
					localStorage.setItem('setup', JSON.stringify(response.data.setup))
					localStorage.setItem('defaults', JSON.stringify(response.data.defaults))
					
					//dismiss overlay modal
					this.closeModal()
					
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
			templateRenamed(template) {
				this.templates[template.index]['name'] = template.name 
			},
			templateDeleted(template) {
				this.templates.splice(template.index, 1)
			},
            closeModal() {
				const documentModalStore = useDocumentModalStore()
                documentModalStore.close()
            }
		}
	};
</script>

