<script setup>
import Navbar from '@/components/common/Navbar.vue'
import { useDocumentStore, useDocumentModalStore } from '@/stores'
import createHttp from '@/axios.js'

const documentStore = useDocumentStore()
documentStore.setSpinner('loading_workspace', true)
    
const documentModalStore = useDocumentModalStore()
documentModalStore.show('LoadingWorkspace')
</script>

<template>
	<Navbar />
	
	<section class="bg-gray-100">
		<div id="fpdf_designer_elements" class="bg-gray-100 shadow">
			<button class="mr-4 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
			@click="launchModal('PageSettings')"
			>
			<Cog8ToothIcon class="inline-block h-4 w-4 mb-1"/> 
			Page Settings
			</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="text" data-is-new-element="true"
			@click="launchModal('AddText')"
			>
			Add Text
			</button>
			<button @click="launchModal('UpdateText', false)" ref="updateModalButton-text" class="hidden">Update Text</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="text" data-is-new-element="true"
			@click="launchModal('AddRectangle')"
			>
			Add Rectangle
			</button>
			<button @click="launchModal('UpdateRectangle')" ref="updateModalButton-rectangle" class="hidden">Update Rectangle</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="rect" data-is-new-element="true"
			@click="launchModal('AddTable')"
			>
			Add Table
			</button>
			<button @click="launchModal('UpdateTable')" ref="updateModalButton-table" class="hidden">Update Table</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="line" data-is-new-element="true"
			@click="launchModal('AddLine')"
			>
			Add Line
			</button>
			<button @click="launchModal('UpdateLine')" ref="updateModalButton-line" class="hidden">Update Line</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="image" data-is-new-element="true"
			@click="launchModal('AddImage')"
			>
			Add Image
			</button>
			<button @click="launchModal('UpdateImage')" ref="updateModalButton-image" class="hidden">Update Image</button>
			
			<div class="float-right">
				<button @click="reset" class="text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><ArrowPathIcon class="inline-block h-4 w-4 mb-1"/> Reset</button>
				<button @click="preview" class="ml-2 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><AdjustmentsVerticalIcon class="inline-block h-4 w-4 mb-1"/> Preview</button>
				<button @click="save" class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><InboxArrowDownIcon class="inline-block h-4 w-4 mb-1"/> Save</button>
			</div>
		</div>
		<div v-show="documentStore.isLoadingWorkspace">
            <overlay-modal text="Loading workspace..." v-if="documentModalStore.name == 'LoadingWorkspace'" />
		</div>
        <overlay-modal text="Saving document..." v-if="documentModalStore.name == 'SavingDocument'" />
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
						v-html="draggable.text"
						>
						</span>
					</div>
					<div v-if="draggable.type == 'rectangle'" class="flex flex-row items-center justify-left"
					:style="
							'height: '+draggable.height+'px;'+ 
							'border: '+draggable.border_weight +'mm '+draggable.border_color+' solid;'+ 
							'background-color: '+(draggable.background == 'none' ? 'none' : draggable.background_color)
							"
					>
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
							@dblclick="updateCell(index, rowIndex, columnIndex)"							
							:style="getTdBorderStyle(rowIndex, columnIndex, draggable)+' '+
									getTextStyle(draggable, rowIndex, columnIndex)+
									getTdWidthAndHeight(rowIndex, columnIndex, draggable)"
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
	<page-settings-modal  v-if="documentModalStore.name == 'PageSettings'" />
	<add-table-modal v-if="documentModalStore.name == 'AddTable'" />
	<update-table-modal v-if="documentModalStore.name == 'UpdateTable'" />
	<button data-te-toggle="modal" data-te-target="#updateTableCellModal" ref="updateCell" class="hidden">Update Table Cell</button>
	<update-table-cell-modal :cell=cell v-if="documentModalStore.name == 'UpdateTableCell'"/>
	<add-text-modal  v-if="documentModalStore.name == 'AddText'" />
	<update-text-modal v-if="documentModalStore.name == 'UpdateText'" />
	<add-rectangle-modal v-if="documentModalStore.name == 'AddRectangle'" />
	<update-rectangle-modal v-if="documentModalStore.name == 'UpdateRectangle'" />
	<add-line-modal v-if="documentModalStore.name == 'AddLine'" />
	<update-line-modal v-if="documentModalStore.name == 'UpdateLine'" />
	<add-image-modal v-if="documentModalStore.name == 'AddImage'" />
	<update-image-modal v-if="documentModalStore.name == 'UpdateImage'" />
    <upload-image-modal v-if="documentModalStore.name == 'UploadImage'" />
	
	<button class="hidden" ref="launchSaveDocumentModal"
	@click="launchModal('SaveDocument')"
	></button>
	<save-document-modal v-if="documentModalStore.name == 'SaveDocument'" />
	<!--end modals-->
</template>

<script>
	import VueDraggableResizable from "vue-draggable-resizable-vue3"
	import AddTableModal from '@/components/modals/AddTableModal.vue'
	import UpdateTableModal from '@/components/modals/UpdateTableModal.vue'
	import UpdateTableCellModal from '@/components/modals/UpdateTableCellModal.vue'
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
	import { Cog8ToothIcon,AdjustmentsVerticalIcon,ArrowPathIcon,InboxArrowDownIcon } from '@heroicons/vue/20/solid'
	import Spinner from '@/components/form/Spinner'
    import UploadImageModal from '@/components/modals/UploadImageModal.vue'
    import OverlayModal from '@/components/form/SpinnerModal.vue'
	
	export default {
		components: {
			VueDraggableResizable,
			AddTableModal,
			AddTextModal,
			AddLineModal,
			UpdateTableModal,
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
				cell: {},
                launchPageSettingsModal: false
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
            launchModal(modalName, isStatic = false) {
                const documentModalStore = useDocumentModalStore()
				documentModalStore.show(modalName, isStatic)
            },
			getTextStyle(draggable, rowIndex = null, columnIndex = null) {
				let style = ''
				let isTable = false
				
				if(rowIndex !== null) {
					//draggable is a table
					isTable = true
					var table = draggable
					if(rowIndex == 0) {
						draggable = table.column_settings
					}
					else {
						draggable = table.row_settings
					}
				}
				
				let textAlign = draggable.text_align
				let fontSize = draggable.font_size
				let fontColor = draggable.font_color
				let fontStyle = draggable.font_style
				
				if(isTable) {
					let cell = table['cells'][rowIndex][columnIndex]
					if(typeof cell.text_align !== 'undefined') {
						textAlign = cell.text_align
					}
					if(typeof cell.font_size !== 'undefined') {
						fontSize = cell.font_size
					}
					if(typeof cell.font_color !== 'undefined') {
						fontColor = cell.font_color
					}
					if(typeof cell.font_style !== 'undefined') {
						fontStyle = cell.font_style
					}
					
					if(draggable.background != 'none') {
						style += 'background-color: '+draggable.background_color+';'
					}
				}
				
				style += 'font-family:'+draggable.font_family+';'
				style += 'font-size:'+fontSize+'pt;'
				style += 'color:'+fontColor+';'
				style += 'text-align:'+textAlign+';'
				
				if(fontStyle.includes('bold')) {
					style += 'font-weight: bold;'
				}
				if(fontStyle.includes('italic')) {
					style += 'font-style: italic;'
				}
				if(fontStyle.includes('underline')) {
					style += 'text-decoration: underline;'
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
                    this.closeModal()
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
                    this.launchModal('SavingDocument')
					documentStore.update().then(() => {
                        this.closeModal()
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
            closeModal() {
				const documentModalStore = useDocumentModalStore()
                documentModalStore.close()
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
			},
			updateCell(draggableIndex, rowIndex, columnIndex) {
				this.cell.draggable = draggableIndex
				this.cell.row = rowIndex
				this.cell.column = columnIndex
				this.$refs.updateCell.click()
			}
		}
	};
</script>

<style scoped>
.panel {
	padding-top: 150px;
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
	padding: 15px 30px;
	width: 100%;
	min-width: 286mm/*336mm*/;
	margin-top: 60px;
}

#fpdf_designer_elements button {
	border: 1px solid #d3d3d3;
	padding: 4px 8px;
    font-size: 0.8rem;
}
</style>
