<script setup>
import { useDocumentStore } from '@/stores'

const documentStore = useDocumentStore()
</script>
<template>
	<modal title="Update Text" id="updateTextModal">
		<form @submit.prevent="onSubmit">
		<input type="hidden" v-model="documentStore.activeDraggable.type"/>
		<div class="">
			<label class="block">Text</label>
			<textarea v-model="documentStore.activeDraggable.text" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow"></textarea>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Left</label>
					<input type="number" v-model="documentStore.activeDraggable.left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Top</label>
					<input type="number" v-model="documentStore.activeDraggable.top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Height</label>
					<input type="number" v-model="documentStore.activeDraggable.height" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Width</label>
					<input type="number" v-model="documentStore.activeDraggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Font Size</label>
					<input type="number" v-model="documentStore.activeDraggable.font_size" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Weight</label>
					<input type="text" v-model="documentStore.activeDraggable.font_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Color</label>
					<input type="color" v-model="documentStore.activeDraggable.font_color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Family</label>
					<input type="text" v-model="documentStore.activeDraggable.font_family" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Padding Top</label>
					<input type="number" v-model="documentStore.activeDraggable.padding_top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Padding Right</label>
					<input type="number" v-model="documentStore.activeDraggable.padding_right" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Padding Bottom</label>
					<input type="number" v-model="documentStore.activeDraggable.padding_bottom" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Padding Left</label>
					<input type="number" v-model="documentStore.activeDraggable.padding_left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<label class="block">Background Color</label>
			<input type="color" v-model="documentStore.activeDraggable.background_color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/Modal.vue'
	
	export default {
		name: 'UpdateTextModalComponent',
		components: {
				Modal
			},
		methods: {
			onSubmit() {
				//empty
			}
		}
	}
</script>