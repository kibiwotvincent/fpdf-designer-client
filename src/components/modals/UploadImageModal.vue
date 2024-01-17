<template>
	<modal>
		<form @submit.prevent="onSubmit">
		<label class="block">Select Image to Upload</label>
		<input type="file" ref="file" name="image" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />	
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
			<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">
			Close
			</button>
			<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Cancel
			</button>
			<button :disabled=uploading class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			<div class="inline" v-show=uploading>
				<Spinner :size=4 />
			</div>
			Upload & Add Image
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import Spinner from '@/components/form/Spinner'
	import { useDocumentStore, useDocumentModalStore } from '@/stores'
	import createHttp from '@/axios.js'
	
	export default {
		name: 'UploadImageModalComponent',
		components: {
			Modal,
			Spinner
		},
		data: () => ({
			draggable: JSON.parse(localStorage.getItem('defaults')).image,
			uploading: false
		}),
		methods: {
			cancel() {
				this.resetForm()
				this.closeModal()
			},
			resetForm() {
				this.draggable = JSON.parse(localStorage.getItem('defaults')).image
			},
			onSubmit() {
				this.uploading = true
				//upload image
				const formData = new FormData()
				formData.append("image", this.$refs.file.files.item(0))
				
				const url = process.env.VUE_APP_API_URL+'/api/workspace/'+this.id+'/upload-image'
				const http = createHttp()
				http.post(url, formData, {headers : {"Content-Type": 'multipart/form-data'}})
				.then((response) => {
					this.uploading = false
					const documentStore = useDocumentStore()
					//pass the draggable as new object
					this.draggable.is_local = "yes"
					this.draggable.url = response.data.url
					documentStore.addDraggable({ ...this.draggable })
					this.resetForm()
					this.closeModal()
				});
			},
			closeModal() {
				const documentModalStore = useDocumentModalStore()
				documentModalStore.close()
			}
		}
	}
</script>