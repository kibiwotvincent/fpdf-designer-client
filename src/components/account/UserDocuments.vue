<script setup>
	import Spinner from '@/components/form/Spinner'
	import Alert from '@/components/common/Alert'
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
	import { PlusIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
    import { useDocumentModalStore } from '@/stores'
    const modalStore = useDocumentModalStore()
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
		
			<div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
				<div class="px-4 py-2 border-b flex justify-between">
					<h6 class="mt-2 text-l font-medium leading-tight text-neutral-700">
					{{ document.name }}
					</h6>
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
                              <MenuItem v-slot="{ active }" @click="viewPdf(document.id)">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Pdf</a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }" @click="launchModal('RenameDocument'+index)">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Rename</a>
                                </MenuItem>
                              <MenuItem v-slot="{ active }" @click="launchModal('DeleteDocument'+index)">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                    </Menu>
                    <rename-document-modal 
                        :id=document.id 
                        :name=document.name 
                        :index=index
                        @renamed="documentRenamed"	
                        v-if="modalStore.name == 'RenameDocument'+index"
                        />
                    <delete-document-modal 
                        :id=document.id 
                        :name=document.name 
                        :index=index
                        @deleted="documentDeleted"
                        v-if="modalStore.name == 'DeleteDocument'+index"
                        />
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
	<overlay-modal text="Initializing design panel..." v-if="modalStore.name == 'InitializingDesignPanel'" />
</template>

<script>
	import createHttp from '@/axios.js'
	import OverlayModal from '@/components/form/SpinnerModal.vue'
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
            launchModal(modalName) {
                const modalStore = useDocumentModalStore()
				modalStore.show(modalName)
            },
			initFromSource(source, id) {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/init/'+source+'/'+id
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
			documentRenamed(document) {
				this.documents[document.index]['name'] = document.name 
			},
			documentDeleted(document) {
				this.documents.splice(document.index, 1)
			},
            closeModal() {
				const documentModalStore = useDocumentModalStore()
                documentModalStore.close()
            }
		}
	};
</script>

