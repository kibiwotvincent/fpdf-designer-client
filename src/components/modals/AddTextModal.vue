<template>
	<modal id="addTextModal">
		<form @submit.prevent="onSubmit">
		<input type="hidden" v-model="draggable.type"/>
		<div class="">
			<label class="block">Text</label>
			<textarea v-model="draggable.text" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow"></textarea>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Left</label>
					<input type="number" v-model="draggable.left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Top</label>
					<input type="number" v-model="draggable.top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Height</label>
					<input type="number" v-model="draggable.height" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Width</label>
					<input type="number" v-model="draggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Text Align</label>
					<input type="text" v-model="draggable.text_align" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Size</label>
					<input type="number" v-model="draggable.font_size" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Weight</label>
					<input type="text" v-model="draggable.font_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Color</label>
					<input type="color" v-model="draggable.font_color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Family</label>
					<input type="text" v-model="draggable.font_family" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Border Bottom</label>
					<input type="text" v-model="draggable.border_bottom" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Border Color</label>
					<input type="color" v-model="draggable.border_color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Border Weight</label>
					<input type="text" v-model="draggable.border_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Padding Top</label>
					<input type="number" v-model="draggable.padding_top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Padding Right</label>
					<input type="number" v-model="draggable.padding_right" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Padding Bottom</label>
					<input type="number" v-model="draggable.padding_bottom" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Padding Left</label>
					<input type="number" v-model="draggable.padding_left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<label class="block">Background Color</label>
			<input type="color" v-model="draggable.background_color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
		</div>
		<div class="flex justify-between">
			<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">
			Close
			</button>
			<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Cancel
			</button>
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Text
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'AddTextModalComponent',
		components: {
			Modal
		},
		data: () => ({
				draggable: {},
				defaultDraggable: {}
			}),
		mounted() {
			const documentStore = useDocumentStore()
			this.draggable = documentStore.defaults.text
			this.defaultDraggable = { ...this.draggable }
		},
		methods: {
			cancel() {
				this.resetForm()
				this.closeModal()
			},
			resetForm() {
				this.draggable = { ...this.defaultDraggable }
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