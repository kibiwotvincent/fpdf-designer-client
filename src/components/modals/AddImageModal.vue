<template>
	<modal title="Add Image" id="addImageModal">
		<form @submit="onSubmit">
		<input type="hidden" v-model="draggable.type"/>
		<div class="">
			<label class="block">Image Url</label>
			<input type="text" v-model="draggable.url" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
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
		</div>
		<div class="flex justify-end">
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Image
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/Modal.vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'AddImageModalComponent',
		components: {
				Modal
			},
		props: {
			document: document,
		},
		data: () => ({
				draggable: {
					'type' : 'image',
					'url' : 'http://localhost:8080/2.png',
					'left' : '0',
					'top' : '0',
					'height' : '300',
					'width' : '300',
				},
			}),
		methods: {
			onSubmit(e) {
				e.preventDefault()
				this.draggable.left = parseInt(this.draggable.left)
				this.draggable.top = parseInt(this.draggable.top)
				this.draggable.height = parseInt(this.draggable.height)
				this.draggable.width = parseInt(this.draggable.width)
				
				const documentStore = useDocumentStore()
				documentStore.addDraggable(this.draggable)
			}
		}
	}
</script>

<style scoped>

</style>