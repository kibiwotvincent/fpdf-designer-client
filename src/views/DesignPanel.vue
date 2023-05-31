<script setup>
import Navbar from '@/components/common/Navbar.vue'
import { useDocumentStore } from '@/stores'
import createHttp from '@/axios.js'

const documentStore = useDocumentStore()
documentStore.setSpinner('loading_workspace', true)
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
			<button data-te-toggle="modal" data-te-target="#updateTextModal" ref="updateModalButton-text" class="hidden">Update Text</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="text" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addRectangleModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Rectangle
			</button>
			<button data-te-toggle="modal" data-te-target="#updateRectangleModal" ref="updateModalButton-rectangle" class="hidden">Update Rectangle</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="rect" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addTableModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Table
			</button>
			<button data-te-toggle="modal" data-te-target="#updateTableModal" ref="updateModalButton-table" class="hidden">Update Table</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="line" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addLineModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Line
			</button>
			<button data-te-toggle="modal" data-te-target="#updateLineModal" ref="updateModalButton-line" class="hidden">Update Line</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="image" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addImageModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Image
			</button>
			<button data-te-toggle="modal" data-te-target="#updateImageModal" ref="updateModalButton-image" class="hidden">Update Image</button>
			
			<div class="float-right">
				<button @click="reset" class="text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><ArrowPathIcon class="inline-block h-4 w-4 mb-1"/> Reset</button>
				<button @click="preview" class="ml-2 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><AdjustmentsVerticalIcon class="inline-block h-4 w-4 mb-1"/> Preview</button>
				<button @click="save" class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><InboxArrowDownIcon class="inline-block h-4 w-4 mb-1"/> Save</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><ArrowDownTrayIcon class="inline-block h-4 w-4 mb-1"/> Download</button>
			</div>
		</div>
		<div v-show="documentStore.isLoadingWorkspace" class="w-full flex justify-center mt-[132px] mb-4 text-gray-600 bg-blue-50" style="position:fixed;z-index:30;">
			<Spinner text="Loading workspace..." :show-text=true />
		</div>
		<div v-show="documentStore.isSavingDocument" class="w-full flex justify-center mt-[132px] mb-4 text-gray-600 bg-blue-50" style="position:fixed;z-index:30;">
			<Spinner text="Saving document..." :show-text=true />
		</div>
		<div v-show="documentStore.isResetingWorkspace" class="w-full flex justify-center mt-[132px] mb-4 text-gray-600 bg-blue-50" style="position:fixed;z-index:30;">
			<Spinner text="Reseting workspace..." :show-text=true />
		</div>
		<div class="panel bg-blue-50 flex items-center px-8">
			<div class="page" :style="'width: '+page.width+'px;height:'+page.height+'px;'">
				<div v-show="documentStore.isLoadingWorkspace == false" class="workspace" 
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
					<div v-if="draggable.type == 'text'" :class="'flex flex-row items-center justify-'+(draggable.text_align == 'right' ? 'end' : draggable.text_align)"
					:style="
							'height: '+draggable.height+'px;'+ 
							'border-left: '+(draggable.border_left == 'yes' ? draggable.border_weight : 0)+'mm '+draggable.border_color+' solid;'+ 
							'border-top: '+(draggable.border_top == 'yes' ? draggable.border_weight : 0)+'mm '+draggable.border_color+' solid;'+ 
							'border-right: '+(draggable.border_right == 'yes' ? draggable.border_weight : 0)+'mm '+draggable.border_color+' solid;'+ 
							'border-bottom: '+(draggable.border_bottom == 'yes' ? draggable.border_weight : 0)+'mm '+draggable.border_color+' solid;'+ 
							'background-color: '+(draggable.background == 'none' ? 'none' : draggable.background_color)
						">
						<span 
						:style="getTextStyle(draggable)"
						v-html=draggable.text 
						>
						</span>
					</div>
					<div v-if="draggable.type == 'rectangle'" class="flex flex-row items-center justify-left"
					:style="
							'height: '+draggable.height+'px;'+ 
							'border: '+draggable.border_weight +'mm '+draggable.border_color+' solid;'+ 
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
					<div v-if="draggable.type == 'line'" class="flex flex-row items-center justify-left"
					:style="
					'height: '+draggable.height+'px;'+
					'border-'+convertLineType(draggable.line_type)+': '+draggable.line_weight +'mm '+draggable.line_color+' solid;'
					">
					</div>
					<span v-if="draggable.type == 'image'">
						<img :src="draggable.url" class="w-full h-full" />
					</span>
					<div v-if="draggable.type == 'table'">
						<table :width="draggable.width+'px'" :height="draggable.height+'px'" style="border-spacing: 0px;">
						<thead>
						
						<tr
						v-for="(row,rowIndex) in draggable.cells" 
						:key=rowIndex 
						>
							<td 
							v-for="(cell,columnIndex) in row" 
							:key=columnIndex 
							:style="getTdBorderStyle(rowIndex, columnIndex, draggable)+' '+
									getTextStyle(draggable, rowIndex)+
									getTdWidthAndHeight(rowIndex, columnIndex, draggable)"
							@click="editCell(cell)"
							v-html="cell.value"
							></td>
						</tr>
						</thead>
						
						</table>
					</div>
					</vue-draggable-resizable>
				</div>
			</div>
		</div>
	</section>
	<!--modals-->
	<page-settings-modal />
	<add-table-modal />
	<update-table-modal />
	<add-text-modal />
	<update-text-modal />
	<add-rectangle-modal />
	<update-rectangle-modal />
	<add-line-modal />
	<update-line-modal />
	<add-image-modal />
	<update-image-modal />
	
	<button class="hidden" ref="launchSaveDocumentModal"
	data-te-toggle="modal"
	data-te-target="#saveDocumentModal"
	data-te-ripple-init
	data-te-ripple-color="light"
	></button>
	<save-document-modal />
	<!--end modals-->
</template>

<script>
	import VueDraggableResizable from "vue-draggable-resizable-vue3"
	import AddTableModal from '@/components/modals/AddTableModal.vue'
	import UpdateTableModal from '@/components/modals/UpdateTableModal.vue'
	import AddRectangleModal from '@/components/modals/AddRectangleModal.vue'
	import UpdateRectangleModal from '@/components/modals/UpdateRectangleModal.vue'
	import AddTextModal from '@/components/modals/AddTextModal.vue'
	import UpdateTextModal from '@/components/modals/UpdateTextModal.vue'
	import AddLineModal from '@/components/modals/AddLineModal.vue'
	import UpdateLineModal from '@/components/modals/UpdateLineModal.vue'
	import AddImageModal from '@/components/modals/AddImageModal.vue'
	import UpdateImageModal from '@/components/modals/UpdateImageModal.vue'
	import PageSettingsModal from '@/components/modals/PageSettingsModal.vue'	
	import SaveDocumentModal from '@/components/modals/SaveDocumentModal.vue'	
	import { Cog8ToothIcon,AdjustmentsVerticalIcon,ArrowPathIcon,InboxArrowDownIcon,ArrowDownTrayIcon } from '@heroicons/vue/20/solid'
	import Spinner from '@/components/form/Spinner'
	//import { defineAsyncComponent } from 'vue'
	
	export default {
		components: {
			VueDraggableResizable,
			AddTableModal,
			AddTextModal,
			AddLineModal,
			UpdateTableModal,
			/*UpdateTableModal: defineAsyncComponent(() => 
				import('@/components/modals/UpdateTableModal.vue')
			)*/
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
			}
		},
		created() {
			/*watch for page settings changes and refresh page design*/
			const documentStore = useDocumentStore()
			this.$watch(
					() => documentStore.pageSettings,
					() => {
							this.refreshDesignPanel()
						}
					)
		},
		mounted() {
			const documentStore = useDocumentStore()
			documentStore.updateDocument('id', this.id)
			this.loadWorkspace()
		},
		methods: {
			getTextStyle(draggable, rowIndex = null) {
				let style = ''
				
				if(rowIndex !== null) {
					//draggable is a table
					if(rowIndex == 0) {
						draggable = draggable.column_settings
					}
					else {
						draggable = draggable.row_settings
					}
				}
				
				style += 'font-family:'+draggable.font_family+';'
				style += 'font-size:'+draggable.font_size+'pt;'
				style += 'color:'+draggable.font_color+';'
				style += 'text-align:'+draggable.text_align+';'
				
				if(draggable.font_style.includes('bold')) {
					style += 'font-weight: bold;'
				}
				if(draggable.font_style.includes('italic')) {
					style += 'font-style: italic;'
				}
				if(draggable.font_style.includes('underline')) {
					style += 'text-decoration: underline;'
				}
				if(draggable.background != 'none') {
					style += 'background-color: '+draggable.background_color+';'
				}
				
				return style
			},
			getTdBorderStyle(rowIndex, columnIndex, table) {
				if(rowIndex == 0) {
					return this.getColumnBorderStyle(rowIndex, columnIndex, table)
				}
				else {
					return this.getRowBorderStyle(rowIndex, columnIndex, table)
				}
			},
			getColumnBorderStyle(rowIndex, columnIndex, table) {
				let style = ''
				let draggable  = table.column_settings
				
				let includeVerticalBorders = draggable.border_columns == "yes"
				
				if(includeVerticalBorders) {
					if(draggable.border_left == "yes" && rowIndex == 0) {
						style += 'border-left: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					else {
						if(rowIndex == 0 && columnIndex != 0) {
							style += 'border-left: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
						}
					}
					if(draggable.border_right == "yes" && rowIndex == 0) {
						style += 'border-right: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					else {
						if(rowIndex == 0 && columnIndex != table.columns - 1) {
							style += 'border-right: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
						}
					}
				}
				else {
					if(draggable.border_left == "yes" && rowIndex == 0 && columnIndex == 0) {
						style += 'border-left: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					if(draggable.border_right == "yes" && rowIndex == 0 && columnIndex == table.columns - 1) {
						style += 'border-right: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
				}
				
				if(draggable.border_top == "yes" && rowIndex == 0) {
					style += 'border-top: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
				}
				if(draggable.border_bottom == "yes" && rowIndex == 0) {
					style += 'border-bottom: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
				}
				
				return style
			},
			getRowBorderStyle(rowIndex, columnIndex, table) {
				let style = ''
				let draggable  = table.row_settings
				
				let includeVerticalBorders = draggable.border_columns == "yes"
				let includeHorizontalBorders = draggable.border_rows == "yes"
				
				if(includeVerticalBorders) {
					if(draggable.border_left == "yes" && rowIndex > 0) {
						style += 'border-left: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					else {
						if(rowIndex > 0 && columnIndex != 0) {
							style += 'border-left: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
						}
					}
					if(draggable.border_right == "yes" && rowIndex > 0) {
						style += 'border-right: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					else {
						if(rowIndex > 0 && columnIndex != table.columns - 1) {
							style += 'border-right: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
						}
					}
				}
				else {
					if(draggable.border_left == "yes" && rowIndex > 0 && columnIndex == 0) {
						style += 'border-left: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					if(draggable.border_right == "yes" && rowIndex > 0 && columnIndex == table.columns - 1) {
						style += 'border-right: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
				}
				
				if(includeHorizontalBorders) {
					if(draggable.border_top == "yes" && rowIndex >= 1) {
						style += 'border-top: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					else {
						if(rowIndex > 1) {
							style += 'border-top: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
						}
					}
					
					if(draggable.border_bottom == "yes" && rowIndex == table.rows - 1) {
						style += 'border-bottom: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
				}
				else {
					if(draggable.border_top == "yes" && rowIndex == 1) {
						style += 'border-top: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
					if(draggable.border_bottom == "yes" && rowIndex == table.rows - 1) {
						style += 'border-bottom: '+draggable.border_weight+'mm solid '+draggable.border_color+';'
					}
				}
				
				return style
			},
			getTdWidthAndHeight(rowIndex, columnIndex, draggable) {
				let style = ''
				let cell = draggable.cells[rowIndex][columnIndex]
				
				if(rowIndex > 0) {
					cell.is_width = draggable.cells[0][columnIndex].width
					cell.is_width_auto = draggable.cells[0][columnIndex].is_width_auto
				}
				
				if(cell.is_width_auto == "yes") {
					style += 'width: auto;'
				}
				else {
					style += 'width: '+cell.width+'px;'
				}
				if(cell.is_height_auto == "yes") {
					style += 'height: auto;'
				}
				else {
					style += 'height: '+cell.height+'px;'
				}
				
				return style
			},
			editCell(cell) {
				console.log(cell.value)
			},
			convertLineType(lineType) {
				return (lineType == 'vertical') ? 'left' : 'top'
			},
			async loadWorkspace() {
				const documentStore = useDocumentStore()
				documentStore.reset()
				
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/workspace/'+this.id)
				.then((response) => {
					//save document ID in session; fresh page settings will be fetched if document ID changes
					sessionStorage.setItem('document_id', response.data.id)
					
					const documentStore = useDocumentStore()
					documentStore.setSpinner('loading_workspace', false)
					documentStore.saveToSession('page_settings', response.data.page_settings)
					documentStore.saveToSession('draggables', response.data.draggables)
					documentStore.setPageSettings(response.data.page_settings)
					documentStore.setDocumentName(response.data.name)
					documentStore.updatePageMargins()
					documentStore.updatePageOrientation()
					documentStore.updateDefaultFontSettings()
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
				if(documentStore.doc.name == '') {
					this.$refs.launchSaveDocumentModal.click()
				}
				else {
					documentStore.setSpinner('saving_document', true)
					documentStore.update().then(() => {
						documentStore.setSpinner('saving_document', false)
					})
				}
			},
			async reset() {
				const documentStore = useDocumentStore()
				documentStore.setSpinner('reseting_workspace', true)
				documentStore.reset()
				
				const http = createHttp()
				http.post(process.env.VUE_APP_API_URL+'/api/workspace/'+this.id+'/reset')
				.then((response) => {
					const documentStore = useDocumentStore()
					documentStore.setSpinner('reseting_workspace', false)
					documentStore.saveToSession('page_settings', response.data.page_settings)
					documentStore.saveToSession('draggables', response.data.draggables)
					documentStore.setPageSettings(response.data.page_settings)
					documentStore.updatePageMargins()
					documentStore.updatePageOrientation()
					documentStore.updateDefaultFontSettings()
					this.refreshDesignPanel()
					documentStore.initializeWorkspace()
				})
			},
			async preview() {
				const url = process.env.VUE_APP_API_URL+'/api/workspace/'+this.id+'/preview'
				const http = createHttp({responseType: 'blob'})
				http.get(url)
				.then((response) => {
					var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
					var fileLink = document.createElement('a');
					fileLink.href = fileURL;
					fileLink.setAttribute('download', this.id+'.pdf');
					document.body.appendChild(fileLink);
					fileLink.click();
				});
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
				//reset active draggable first
				documentStore.resetActiveDraggable()
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
	padding: 4px 10px;
}
</style>
