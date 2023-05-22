<template>
	<modal id="addTableModal">
		<form @submit.prevent="onSubmit">
		<div class="rounded">
			<div class="mt-3">
				<ul>
					<li @click="setActiveTab('table-settings')" class="inline text-gray-700 p-3 border-l border-t border-r border-b cursor-pointer" :class="activeTab == 'table-settings' ? 'bg-gray-200 text-red-400' : ''">Table Settings</li>
					<li @click="setActiveTab('column-settings')" class="inline text-gray-700 p-3 border-t border-r border-b cursor-pointer" :class="activeTab == 'column-settings' ? 'bg-gray-200 text-red-400' : ''">Column Settings</li>
					<li @click="setActiveTab('row-settings')" class="inline text-gray-700 p-3 border-t border-r border-b cursor-pointer" :class="activeTab == 'row-settings' ? 'bg-gray-200 text-red-400' : ''">Row Settings</li>
				</ul>
			</div>
			<div class="border p-3 mt-2">
				<div v-show="activeTab == 'table-settings'">
				<table-settings :draggable=draggable @toggle="toggleTableSetting" />
				</div>
				<div v-show="activeTab == 'column-settings'">
				<column-settings :draggable=draggable @toggle="toggleColumnSetting" />
				</div>
				<div v-show="activeTab == 'row-settings'">
				<RowSettings :draggable=draggable />
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
	import { useDocumentStore } from '@/stores'
	
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
			toggleTableSetting(itemToToggle, value) {
				if(itemToToggle == "border") {
					let border = value
					this.draggable['border_'+border] = this.draggable['border_'+border] == 'none' ? 'yes' : 'none'
				}
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
					let columnIndex = value
					this.draggable.column_settings.columns[columnIndex][itemToToggle] = this.draggable.column_settings.columns[columnIndex][itemToToggle] == 'yes' ? 'no' : 'yes'
				}
				if(itemToToggle == "background") {
					this.draggable.column_settings.background = this.draggable.column_settings.background == 'none' ? this.draggable.column_settings.background_color : 'none'
					if(this.draggable.column_settings.background == 'none') {
						this.draggable.column_settings.background_color = JSON.parse(localStorage.getItem('defaults')).text.background_color
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
				this.$refs.closeModal.click()
			},
			toggleBorder(border) {
				this.draggable['border_'+border] = this.draggable['border_'+border] == 'none' ? 'yes' : 'none'
			},
		}
	}
</script>