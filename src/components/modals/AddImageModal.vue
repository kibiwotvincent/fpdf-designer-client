<script setup>
   import { useDocumentStore, useDocumentModalStore } from '@/stores' 
</script>
<template>
	<modal>
		<form @submit.prevent="onSubmit">
		<div class="flex w-full gap-4 mb-3">
			<div class="w-1/2">
				<label class="block">Enter Image Url</label>
				<input type="text" v-model="draggable.url" placeholder="http://www.example.com/path-to-image" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
			</div>
			<div class="w-1/2 flex justify-end">
				<button  type="button" @click="launchUploadImageModal" class="block bg-gray-200 text-gray-700 rounded mt-6 h-[2.15rem] px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				or Upload Image
				</button>
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
		<div class="flex justify-between">
			<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Cancel
			</button>
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Image
			</button>
		</div>
		</form>
	</modal>
    
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	
	export default {
		name: 'AddImageModalComponent',
		components: {
			Modal,
		},
		data: () => ({
			draggable: JSON.parse(localStorage.getItem('defaults')).image,
		}),
		methods: {
            launchUploadImageModal() {
                const documentModalStore = useDocumentModalStore()
				documentModalStore.show('UploadImage')
            },
			cancel() {
				this.resetForm()
				this.closeModal()
			},
			resetForm() {
				this.draggable = JSON.parse(localStorage.getItem('defaults')).image
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
			}
		}
	}
</script>