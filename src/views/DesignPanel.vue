<script setup>
import Navbar from '@/components/common/Navbar.vue'
import { useDocumentStore } from '@/stores'
import createHttp from '@/axios.js'

const documentStore = useDocumentStore()
documentStore.isLoaded.document = false
documentStore.isLoaded.template = false

/*documentStore.$subscribe((state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('document', JSON.stringify(state))
  alert()
})*/

</script>

<template>
	<Navbar />
	
	<section class="bg-gray-100">
		<div id="fpdf_designer_elements" class="bg-gray-100 shadow">
			<button class="mr-4 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
			data-te-toggle="modal"
			data-te-target="#pageSettingsModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			<Cog8ToothIcon class="inline-block h-4 w-4 mb-1"/> 
			Page Settings
			</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="text" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addTextModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			ref="textModalButton"
			>
			Add Text
			</button>
			<button data-te-toggle="modal" data-te-target="#updateTextModal" ref="updateModalButton-text" class="hidden">Update</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="rect" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addTableModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Table
			</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="link" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addLinkModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Link
			</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="line" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addLineModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Line
			</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="image" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addImageModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Image
			</button>
			
			<div class="float-right">
				<button @click="reset" class="text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><ArrowPathIcon class="inline-block h-4 w-4 mb-1"/> Reset</button>
				<button class="ml-2 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><AdjustmentsVerticalIcon class="inline-block h-4 w-4 mb-1"/> Preview</button>
				<button @click="save" class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><InboxArrowDownIcon class="inline-block h-4 w-4 mb-1"/> Save</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><ArrowDownTrayIcon class="inline-block h-4 w-4 mb-1"/> Download</button>
			</div>
		</div>
		<div v-show="pageSettingsLoaded == false" class="w-full flex justify-center mt-[132px] mb-4 text-gray-600 bg-blue-50" style="position:fixed;z-index:30;">
			<Spinner text="Loading page settings..." :show-text=true />
		</div>
		<div v-show="pageSettingsLoaded == true && documentStore.isLoaded.document == false" class="w-full flex justify-center mt-[132px] mb-4 text-gray-600 bg-blue-50" style="position:fixed;z-index:30;">
			<Spinner text="Loading document..." :show-text=true />
		</div>
		<div class="panel bg-blue-50 flex items-center px-8">
			<div class="page" :style="'width: '+page.width+'px;height:'+page.height+'px;'">
				<div v-show=pageSettingsLoaded class="workspace" 
				:style="'width: '+page.workspace_width+'px;height:'+page.workspace_height+'px;margin: '+page.top_margin+'px '+page.right_margin+'px '+page.bottom_margin+'px '+page.left_margin+'px'"
				>
					<vue-draggable-resizable v-for="(draggable, index) in documentStore.draggables"
					:key=index
					:parent=true 
					:x=draggable.left 
					:y=draggable.top 
					:w=draggable.width 
					:h=draggable.height
					@activated="onActivated(index)" 
					@deactivated="onDeactivated"
					@resizing="onResize"
					@dragging="onDrag"
					:active= draggable.active
					:resizable= draggable.resizable
					@click.right.prevent="showUpdateDraggable(index)"
					>
					<div v-if="draggable.type != 'image'" :class="'flex flex-row items-center justify-'+(draggable.text_align == 'right' ? 'end' : draggable.text_align)"
					:style="
							'height: '+(draggable.height - 2)+'px;'+ 
							'border-left: '+(draggable.border_left == 'yes' ? draggable.border_weight : 0)+'px '+draggable.border_color+' solid;'+ 
							'border-top: '+(draggable.border_top == 'yes' ? draggable.border_weight : 0)+'px '+draggable.border_color+' solid;'+ 
							'border-right: '+(draggable.border_right == 'yes' ? draggable.border_weight : 0)+'px '+draggable.border_color+' solid;'+ 
							'border-bottom: '+(draggable.border_bottom == 'yes' ? draggable.border_weight : 0)+'px '+draggable.border_color+' solid;'+ 
							'background-color: '+(draggable.background == 'none' ? 'none' : draggable.background_color)
						">
						<span 
						:style="
							'color: '+draggable.font_color+';'+ 
							'font-weight: '+draggable.font_weight+';'+ 
							'font-style: '+draggable.font_style+';'+ 
							'font-size: '+draggable.font_size+'pt;'
							"
						v-html=draggable.text 
						>
						</span>
					</div>
					<span v-if="draggable.type == 'image'">
						<img :src="draggable.url" class="w-full h-full" />
					</span>
					</vue-draggable-resizable>
				</div>
			</div>
		</div>
	</section>
	<!--modals-->
	<page-settings-modal @updated=refreshDesignPanel :refresh=refreshPageSettingsModal />
	<add-table-modal />
	<add-text-modal />
	<update-text-modal />
	<add-link-modal />
	<add-line-modal />
	<add-image-modal />
	<!--end modals-->
</template>

<script>
	import VueDraggableResizable from "vue-draggable-resizable-vue3"
	import AddTableModal from '@/components/modals/AddTableModal.vue'
	import AddTextModal from '@/components/modals/AddTextModal.vue'
	import UpdateTextModal from '@/components/modals/UpdateTextModal.vue'
	import AddLinkModal from '@/components/modals/AddLinkModal.vue'
	import AddLineModal from '@/components/modals/AddLineModal.vue'
	import AddImageModal from '@/components/modals/AddImageModal.vue'
	import PageSettingsModal from '@/components/modals/PageSettingsModal.vue'	
	import { Cog8ToothIcon,AdjustmentsVerticalIcon,ArrowPathIcon,InboxArrowDownIcon,ArrowDownTrayIcon } from '@heroicons/vue/20/solid'
	import Spinner from '@/components/form/Spinner'
	
	export default {
		components: {
			VueDraggableResizable,
			AddTableModal,
			AddTextModal,
			AddLineModal,
		},
		data() {
			return {
				page : {
						'width' : 0,
						'height' : 0,
						'workspace_width' : 0,
						'workspace_height' : 0,
						'top_margin' : 0,
						'right_margin' : 0,
						'bottom_margin' : 0,
						'left_margin' : 0,
						},
				currentTop : 0,
				update : false,
				id : this.$route.params.id,
				pageSettingsLoaded : false,
				refreshPageSettingsModal : false
			}
		},
		mounted() {
			const documentStore = useDocumentStore()
			documentStore.updateDocument('id', this.id)
			documentStore.setPage()
			this.loadWorkspace()
		},
		methods: {
			async loadWorkspace() {
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/workspace/'+this.id)
				.then((response) => {
					//save document ID in session; fresh page settings will be fetched if document ID changes
					sessionStorage.setItem('document_id', response.data.id)
					
					const documentStore = useDocumentStore()
					this.pageSettingsLoaded = true
					documentStore.saveToSession('page_settings', response.data.page_settings)
					documentStore.saveToSession('draggables', response.data.draggables)
					documentStore.setPageSettings(response.data.page_settings)
					documentStore.updatePageMargins()
					documentStore.updatePageOrientation()
					documentStore.updateDefaultFontSettings()
					this.refreshPageSettingsModal = true
					this.refreshDesignPanel()
					documentStore.initializeWorkspace()
				})
			},
			refreshDesignPanel() {
				/*convert page items such as width from mm to px*/
				const documentStore = useDocumentStore()
				const scaleFactor = documentStore.pageSettings.scale_factor
				
				for(let pageItem in this.page) {
					//update page with new values from store
					this.page[pageItem] = documentStore.pageSettings[pageItem] * scaleFactor
				}
				//adjust workspace height & width to fit the page after adding margins
				this.page.workspace_width = this.page.width - (this.page.left_margin + this.page.right_margin)
				this.page.workspace_height = this.page.height - (this.page.top_margin + this.page.bottom_margin)
			},
			save() {
				const documentStore = useDocumentStore()
				documentStore.update()
			},
			reset() {
				this.loadWorkspace()
			},
			onResize: function (x) {
				const documentStore = useDocumentStore()
				documentStore.resizeDraggable(x)
			},
			onDrag: function (x) {
				const documentStore = useDocumentStore()
				documentStore.dragDraggable(x)
				
				/*
				//calculate how much top position has changed
				let adjustTopBy = documentStore.activeDraggable.top - this.currentTop
				
				//adjust the top positions of the other draggables
				for(let i = 0; i < documentStore.draggables.length; i++) {
					let newTop = documentStore.draggables[i].current_top + adjustTopBy
					
					//only move draggables that are below the active draggable
					if(documentStore.draggables[i].current_top >= documentStore.activeDraggable.current_top) {
						documentStore.draggables[i].top = newTop
					}
				}*/
			},
			onActivated (index) {
				const documentStore = useDocumentStore()
				documentStore.setActiveDraggable(documentStore.draggables[index])
				
				/*
				//save the initial top position of the selected draggable
				this.currentTop = documentStore.activeDraggable.top
				
				for(let i = 0; i < documentStore.draggables.length; i++) {
					//save curent top position of the draggable
					//to be used to move other draggables when dragging
					documentStore.draggables[i].current_top = documentStore.draggables[i].top
				}*/
			},
			onDeactivated () {
				this.active = false
			},
			showUpdateDraggable(index) {
				const documentStore = useDocumentStore()
				documentStore.setActiveDraggable(documentStore.draggables[index], index)
				//documentStore.activateDraggable(index)
				//launch update modal
				const modal = 'updateModalButton-'+documentStore.activeDraggable.type
				this.$refs[modal].click()
			}
		}
	};
</script>

<style scoped>
.panel {
	padding-top: 165px;
	padding-bottom: 40px;
}
.page {
	background: #fff;
	margin: auto;
}
.workspace {
	border: 1px pink dotted;
	background: #fff;
}
#fpdf_designer_elements {
	position:fixed; 
	z-index:30; 
	padding: 20px 30px;
	width: 100%;
	min-width: 336mm;
	margin-top: 60px;
}

#fpdf_designer_elements button {
	border: 1px solid #d3d3d3;
	padding: 4px 15.65px;
}
</style>
