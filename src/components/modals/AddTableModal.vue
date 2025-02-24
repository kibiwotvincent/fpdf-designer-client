<template>
	<modal id="addTableModal">
		<form @submit.prevent="onSubmit">
		<div class="rounded">
			<div class="mt-3">
				<ul>
					<li @click="setActiveTab('table-settings')" class="inline text-gray-700 p-3 border-l border-t cursor-pointer" :class="activeTab == 'table-settings' ? 'bg-gray-200 text-red-400' : ''">Table Settings</li>
					<li @click="setActiveTab('column-settings')" class="inline text-gray-700 p-3 border-t border-r cursor-pointer" :class="activeTab == 'column-settings' ? 'bg-gray-200 text-red-400' : ''">Column Settings</li>
					<li @click="setActiveTab('row-settings')" class="inline text-gray-700 p-3 border-t border-r cursor-pointer" :class="activeTab == 'row-settings' ? 'bg-gray-200 text-red-400' : ''">Row Settings</li>
				</ul>
			</div>
			<div class="border p-3 mt-[0.65rem]">
				<div v-show="activeTab == 'table-settings'">
				<table-settings :draggable=draggable @decrease="decrease" @increase="increase" />
				</div>
				<div v-show="activeTab == 'column-settings'">
				<column-settings mode="add" :draggable=draggable @toggle="toggleColumnSetting" />
				</div>
				<div v-show="activeTab == 'row-settings'">
				<row-settings mode="add" :draggable=draggable  @toggle="toggleRowSetting"/>
				</div>
			</div>
		</div>
		<div class="flex justify-between">
			<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">
			Close
			</button>
			<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Cancel
			</button>
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Table
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import TableSettings from '@/components/modals/table/TableSettings.vue'
	import ColumnSettings from '@/components/modals/table/ColumnSettings.vue'
	import RowSettings from '@/components/modals/table/RowSettings.vue'
	import { useDocumentStore, useDocumentModalStore } from '@/stores'
	
	export default {
		name: 'AddTableModalComponent',
		components: {
			Modal,
			TableSettings,
			ColumnSettings,
			RowSettings,
		},
		data: () => ({
				draggable: JSON.parse(localStorage.getItem('defaults')).table,
				activeTab: "table-settings"
		}),
		created() {
			/*watch for page settings changes and change font size, font color & font family*/
			const documentStore = useDocumentStore()
			this.$watch(
					() => documentStore.pageSettings,
					() => {
							let text = JSON.parse(localStorage.getItem('defaults')).text
							this.draggable.column_settings.font_size = text.font_size
							this.draggable.column_settings.font_color = text.font_color
							this.draggable.column_settings.font_family = text.font_family
						}
					)
		},
		methods: {
			setActiveTab(tab) {
				this.activeTab = tab
			},
			toggleColumnSetting(itemToToggle, value) {
				if(itemToToggle == "border") {
					let border = value
					this.draggable.column_settings['border_'+border] = this.draggable.column_settings['border_'+border] == 'none' ? 'yes' : 'none'
				}
				if(itemToToggle == "font_style") {
					if(this.draggable.column_settings.font_style.includes(value)) {
						this.draggable.column_settings.font_style.splice(this.draggable.column_settings.font_style.indexOf(value), 1)
					}
					else {
						this.draggable.column_settings.font_style.push(value)
					}
				}
				if(itemToToggle == "is_width_auto" || itemToToggle == "is_height_auto") {
					let rowIndex = value.row
					let columnIndex = value.column
					if(itemToToggle == "is_height_auto") {
						let isHeightAuto = this.draggable.cells[0][0].is_height_auto == 'yes' ? 'no' : 'yes'
						for(let i = 0; i < this.draggable.cells[rowIndex].length; i++) {
							//update column heights
							this.draggable.cells[0][i].is_height_auto = isHeightAuto
							this.draggable.cells[0][i].height = this.draggable.cells[0][0].height
						}
					}
					else {
						this.draggable.cells[rowIndex][columnIndex][itemToToggle] = this.draggable.cells[rowIndex][columnIndex][itemToToggle] == 'yes' ? 'no' : 'yes'
					}
				}
				if(itemToToggle == "background") {
					this.draggable.column_settings.background = this.draggable.column_settings.background == 'none' ? this.draggable.column_settings.background_color : 'none'
					if(this.draggable.column_settings.background == 'none') {
						this.draggable.column_settings.background_color = JSON.parse(localStorage.getItem('defaults')).text.background_color
					}
				}
			},
			toggleRowSetting(itemToToggle, value) {
				if(itemToToggle == "border") {
					let border = value
					this.draggable.row_settings['border_'+border] = this.draggable.row_settings['border_'+border] == 'none' ? 'yes' : 'none'
				}
				if(itemToToggle == "font_style") {
					if(this.draggable.row_settings.font_style.includes(value)) {
						this.draggable.row_settings.font_style.splice(this.draggable.row_settings.font_style.indexOf(value), 1)
					}
					else {
						this.draggable.row_settings.font_style.push(value)
					}
				}
				if(itemToToggle == "loop_first_row") {
					this.draggable.row_settings.loop_first_row = this.draggable.row_settings.loop_first_row == 'yes' ? 'no' : 'yes'
				}
				if(itemToToggle == "is_height_auto") {
					let rowIndex = value.row
					
					let isHeightAuto = this.draggable.cells[rowIndex][0].is_height_auto == 'yes' ? 'no' : 'yes'
					let height = this.draggable.cells[rowIndex][0].height
					
					for(let columnIndex = 0; columnIndex < this.draggable.cells[rowIndex].length; columnIndex++) {
						//update column heights for the row
						this.draggable.cells[rowIndex][columnIndex].is_height_auto = isHeightAuto
						this.draggable.cells[rowIndex][columnIndex].height = height
					}
				}
				if(itemToToggle == "background") {
					this.draggable.row_settings.background = this.draggable.row_settings.background == 'none' ? this.draggable.row_settings.background_color : 'none'
					if(this.draggable.row_settings.background == 'none') {
						this.draggable.row_settings.background_color = JSON.parse(localStorage.getItem('defaults')).text.background_color
					}
				}
			},
			cancel() {
				this.resetForm()
				this.closeModal()
			},
			resetForm() {
				this.draggable = JSON.parse(localStorage.getItem('defaults')).table
			},
			onSubmit() {
				const documentStore = useDocumentStore()
				//pass the draggable as new object
				documentStore.addDraggable({ ...this.draggable })
				this.resetForm()
				this.closeModal()
			},
			closeModal() {
				const documentModalStore = useDocumentModalStore()
				documentModalStore.close()
			},
			increase(itemToIncrease) {
				if(itemToIncrease == 'rows') {
					let newRowIndex = this.draggable.rows
					let row = this.draggable.cells[newRowIndex] = []
					
					for(let i = 0; i < this.draggable.columns; i++) {
						//insert default columns into the new row
						row.push({...this.draggable.default_cell_values})
					}
				}
				else if(itemToIncrease == 'columns') {
					for(let rowIndex = 0; rowIndex < this.draggable.cells.length; rowIndex++) {
						//insert extra column into existing rows
						let row = this.draggable.cells[rowIndex]
						row.push({...this.draggable.default_cell_values})
					}
				}
				
				this.draggable[itemToIncrease] = this.draggable[itemToIncrease] + 1
			},
			decrease(itemToDecrease) {
				//don't decrease beyond 1 column/row
				if(this.draggable[itemToDecrease] == 1) return
				
				if(itemToDecrease == 'rows') {
					//remove the last row
					this.draggable.cells.pop()
				}
				else if(itemToDecrease == 'columns') {
					for(let rowIndex = 0; rowIndex < this.draggable.cells.length; rowIndex++) {
						//remove last column in existing rows
						let row = this.draggable.cells[rowIndex]
						row.pop()
					}
				}
				
				this.draggable[itemToDecrease] = this.draggable[itemToDecrease] - 1
			}
		}
	}
</script>