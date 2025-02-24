<script setup>
	import Spinner from '@/components/form/Spinner'
	import Alert from '@/components/common/Alert'
	import { PlusIcon } from '@heroicons/vue/20/solid'
    import { useDocumentModalStore } from '@/stores'
    const modalStore = useDocumentModalStore()
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-4 text-gray-700 text-sm font-semibold uppercase">
			Previous Transactions
		</div>
		<router-link to="/account/buy-coins">
			<button class="bg-red-400 hover:underline text-white rounded py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<PlusIcon class="inline-block h-5 w-5 mb-1"/>
				Buy Coins
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
		<div class="w-full">
		<table>
    <thead>
      <tr>
        <th class="font-normal text-sm">Date</th>
        <th class="font-normal text-sm">Amount</th>
        <th class="font-normal text-sm">Coins</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(document) in documents" :key="document.id">
        <td data-label="Name">
          {{ document.name }}
        </td>
        <td data-label="Company">
          {{ document.name }}
        </td>
        <td data-label="City">
          {{ document.name }}
        </td>
      </tr>
    </tbody>
  </table>
		</div>
	</div>
	<overlay-modal text="Initializing design panel..." v-if="modalStore.name == 'InitializingDesignPanel'" />
  <a href="https://pdf-designer.lemonsqueezy.com/buy/a60d4d08-4dbb-4e22-aa06-3cfcfb9ee245?embed=1&media=0&desc=0" class="lemonsqueezy-button">
    Buy 500 Coins</a>
  
</template>

<script>
	import createHttp from '@/axios.js'
	import OverlayModal from '@/components/form/SpinnerModal.vue'
	
	
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

