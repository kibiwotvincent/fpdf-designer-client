<template>
	<modal id="addLineModal">
		<form @submit.prevent="onSubmit">
		<div>
			<div class="w-full mb-3">
				<label class="block">Line Color</label>
				<input type="color" v-model="draggable.line_color" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
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
					<label class="block">Width</label>
					<input type="number" v-model="draggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Line Weight (mm)</label>
					<input type="text" v-model="draggable.line_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
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
			Add Line
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'AddLineModalComponent',
		components: {
			Modal
		},
		data: () => ({
			draggable: JSON.parse(localStorage.getItem('defaults')).line,
		}),
		methods: {
			cancel() {
				this.resetForm()
				this.closeModal()
			},
			resetForm() {
				this.draggable = JSON.parse(localStorage.getItem('defaults')).line
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
			}
		}
	}
</script>