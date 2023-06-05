<template>
	<modal id="updateTableCellModal">
		<div>
			<CellSettings :draggable=cell.draggable mode="update" :row=cell.row :column=cell.column />
		</div>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { reactive, defineAsyncComponent } from 'vue'
	
	export default {
		name: 'UpdateTableModalComponent',
		components: {
			Modal,
			CellSettings: defineAsyncComponent(() => 
				import('@/components/modals/table/CellSettings.vue')
			)
		},
		props: reactive({
					cell: {},
				})
	}
</script>