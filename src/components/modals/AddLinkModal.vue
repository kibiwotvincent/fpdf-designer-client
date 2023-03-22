<template>
	<modal title="Add Link" id="addLinkModal">
		<form @submit="onSubmit">
		<input type="hidden" v-model="draggable.type"/>
		<div class="">
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Link Label</label>
					<input type="text" v-model="draggable.label" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Link Target</label>
					<input type="text" v-model="draggable.target" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
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
		<div class="flex justify-end">
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Link
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/Modal.vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'AddLinkModalComponent',
		components: {
				Modal
			},
		props: {
			document: document,
		},
		data: () => ({
				draggable: {
					'type' : 'link',
					'label' : 'Google',
					'target' : 'https://www.google.com',
					'left' : '0',
					'top' : '0',
					'height' : '50',
					'width' : '400',
					'font_size' : '12',
					'font_weight' : 'normal',
					'font_color' : '#333333',
					'font_family' : 'Arial',
					'padding_top' : '0',
					'padding_right' : '0',
					'padding_bottom' : '0',
					'padding_left' : '0',
					'background_color' : '#ffffff',
				},
			}),
		methods: {
			onSubmit(e) {
				e.preventDefault()
				this.draggable.left = parseInt(this.draggable.left)
				this.draggable.top = parseInt(this.draggable.top)
				this.draggable.height = parseInt(this.draggable.height)
				this.draggable.width = parseInt(this.draggable.width)
				this.draggable.font_size = parseInt(this.draggable.font_size)
				this.draggable.padding_top = parseInt(this.draggable.padding_top)
				this.draggable.padding_right = parseInt(this.draggable.padding_right)
				this.draggable.padding_bottom = parseInt(this.draggable.padding_bottom)
				this.draggable.padding_left = parseInt(this.draggable.padding_left)
				
				const documentStore = useDocumentStore()
				documentStore.addDraggable(this.draggable)
			}
		}
	}
</script>

<style scoped>

</style>