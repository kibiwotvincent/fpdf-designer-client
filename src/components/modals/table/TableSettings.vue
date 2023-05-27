<template>
		<div>
			<div class="flex w-full gap-4 mb-3">
				<div class="w-1/2">
					<label class="block">Number of Columns</label>
					<input type="number" v-model="draggable.columns" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/2">
					<label class="block">Number of Rows</label>
					<input type="number" v-model="draggable.rows" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full gap-4 mb-3">
				<div class="w-1/4">
					<label class="block">Left</label>
					<input type="number" v-model="draggable.left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Top</label>
					<input type="number" v-model="draggable.top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Height</label>
					<input type="number" v-model="draggable.height" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Width</label>
					<input type="number" v-model="draggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
		</div>
</template>

<script>
	import { reactive } from 'vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'TableSettingsComponent',
		props: reactive({
				draggable: {},
			}),
		methods: {
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
		},
		watch: {
			draggable() {
				//
			}
		}
	}
</script>