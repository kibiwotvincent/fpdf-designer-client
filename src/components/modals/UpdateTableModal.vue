<script setup>
import { useDocumentStore } from '@/stores'
const documentStore = useDocumentStore()
</script>

<template>
	<modal id="updateTableModal">
		<div class="flex justify-between pb-3">
			<button @click="duplicateDraggable" class="bg-gray-200 text-gray-700 rounded py-1 px-3 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			<DocumentDuplicateIcon class="inline-block h-4 w-4 mb-1"/> 
			Duplicate
			</button>
			
			<button @click="deleteDraggable" class="bg-red-400 text-white rounded py-1 px-3 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			<TrashIcon class="inline-block h-4 w-4 mb-1"/> 
			Delete
			</button>
			<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">Close</button>
		</div>
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
				<update-table-settings @decrease="decrease" @increase="increase" />
				</div>
				<div v-show="activeTab == 'column-settings'">
				<update-column-settings :draggable=documentStore.activeDraggable @toggle="toggleColumnSetting" />
				</div>
				<div v-show="activeTab == 'row-settings'">
				<update-row-settings :draggable=documentStore.activeDraggable @toggle="toggleRowSetting"/>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { TrashIcon } from '@heroicons/vue/20/solid'
	import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'
	import UpdateTableSettings from '@/components/modals/table/UpdateTableSettings.vue'
	import { defineAsyncComponent } from 'vue'
	
	export default {
		name: 'UpdateTableModalComponent',
		components: {
			Modal,
			TrashIcon,
			DocumentDuplicateIcon,
			UpdateTableSettings,
			UpdateColumnSettings: defineAsyncComponent(() => 
				import('@/components/modals/table/UpdateColumnSettings.vue')
			),
			UpdateRowSettings: defineAsyncComponent(() => 
				import('@/components/modals/table/UpdateRowSettings.vue')
			)
		},
		data: () => ({
				activeTab: "table-settings"
		}),
		methods: {
			deleteDraggable() {
				const documentStore = useDocumentStore()
				const draggableIndex = documentStore.activeDraggable.index
				documentStore.deleteDraggable(draggableIndex)
				//close modal
				this.$refs.closeModal.click()
			},
			duplicateDraggable() {
				const documentStore = useDocumentStore()
				documentStore.addDraggable({ ...documentStore.activeDraggable })
				//close modal
				this.$refs.closeModal.click()
			},
			setActiveTab(tab) {
				this.activeTab = tab
			},
			toggleColumnSetting(itemToToggle, value) {
				const documentStore = useDocumentStore()
				let draggable = documentStore.activeDraggable
				let columnSettings = draggable.column_settings
				let cells = draggable.cells
				
				if(itemToToggle == "border") {
					let border = value
					columnSettings['border_'+border] = columnSettings['border_'+border] == 'none' ? 'yes' : 'none'
				}
				if(itemToToggle == "font_style") {
					if(columnSettings.font_style.includes(value)) {
						columnSettings.font_style.splice(columnSettings.font_style.indexOf(value), 1)
					}
					else {
						columnSettings.font_style.push(value)
					}
				}
				if(itemToToggle == "is_width_auto" || itemToToggle == "is_height_auto") {
					let rowIndex = value.row
					let columnIndex = value.column
					cells[rowIndex][columnIndex][itemToToggle] = cells[rowIndex][columnIndex][itemToToggle] == 'yes' ? 'no' : 'yes'
				}
				if(itemToToggle == "background") {
					columnSettings.background = columnSettings.background == 'none' ? columnSettings.background_color : 'none'
					if(columnSettings.background == 'none') {
						columnSettings.background_color = JSON.parse(localStorage.getItem('defaults')).text.background_color
					}
				}
				
				documentStore.updateDraggable(draggable.index, 'cells', cells)
				documentStore.updateDraggable(draggable.index, 'column_settings', columnSettings)
			},
			toggleRowSetting(itemToToggle, value) {
				const documentStore = useDocumentStore()
				let draggable = documentStore.activeDraggable
				let rowSettings = draggable.row_settings
				let cells = draggable.cells
				
				if(itemToToggle == "border") {
					let border = value
					rowSettings['border_'+border] = rowSettings['border_'+border] == 'none' ? 'yes' : 'none'
				}
				if(itemToToggle == "font_style") {
					if(rowSettings.font_style.includes(value)) {
						rowSettings.font_style.splice(rowSettings.font_style.indexOf(value), 1)
					}
					else {
						rowSettings.font_style.push(value)
					}
				}
				if(itemToToggle == "is_width_auto" || itemToToggle == "is_height_auto") {
					let rowIndex = value.row
					let columnIndex = value.column
					cells[rowIndex][columnIndex][itemToToggle] = cells[rowIndex][columnIndex][itemToToggle] == 'yes' ? 'no' : 'yes'
				}
				if(itemToToggle == "background") {
					rowSettings.background = rowSettings.background == 'none' ? rowSettings.background_color : 'none'
					if(rowSettings.background == 'none') {
						rowSettings.background_color = JSON.parse(localStorage.getItem('defaults')).text.background_color
					}
				}
				
				documentStore.updateDraggable(draggable.index, 'cells', cells)
				documentStore.updateDraggable(draggable.index, 'row_settings', rowSettings)
			},
			increase(itemToIncrease) {
				const documentStore = useDocumentStore()
				let draggable = documentStore.activeDraggable
				let cells = draggable.cells
				
				if(itemToIncrease == 'rows') {
					let row = []
					for(let i = 0; i < draggable.columns; i++) {
						//insert default columns into the new row
						row.push(draggable.default_cell_values)
					}
					cells.push(row)
				}
				else if(itemToIncrease == 'columns') {
					for(let rowIndex = 0; rowIndex < cells.length; rowIndex++) {
						//insert extra column into existing rows
						let row = cells[rowIndex]
						row.push(draggable.default_cell_values)
					}
				}
				
				documentStore.updateDraggable(draggable.index, 'cells', cells)
				documentStore.updateDraggable(draggable.index, itemToIncrease, draggable[itemToIncrease] + 1)
			},
			decrease(itemToDecrease) {
				const documentStore = useDocumentStore()
				let draggable = documentStore.activeDraggable
				let cells = draggable.cells
				
				//don't decrease beyond 1 column/row
				if(draggable[itemToDecrease] == 1) return
				
				if(itemToDecrease == 'rows') {
					//remove the last row
					cells.pop()
				}
				else if(itemToDecrease == 'columns') {
					for(let rowIndex = 0; rowIndex < cells.length; rowIndex++) {
						//remove last column in existing rows
						let row = cells[rowIndex]
						row.pop()
					}
				}
				
				documentStore.updateDraggable(draggable.index, 'cells', cells)
				documentStore.updateDraggable(draggable.index, itemToDecrease, draggable[itemToDecrease] - 1)
			}
		}
	}
</script>