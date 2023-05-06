<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		name: Yup.string().required()
	})
</script>

<template>
	<modal id="saveDocumentModal" size="small">
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<label class="block">Enter Document Name</label>
			<Field type="text" name="name" v-model="name" :class="{ 'is-invalid': errors.name }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" />
			<div class="text-danger">{{errors.name}}</div>
			<div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
			<div class="flex justify-between mt-3">
				<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">
				Close
				</button>
				<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-1 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				Cancel
				</button>
				<button class="bg-red-400 text-white rounded mt-4 py-1 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<span v-show="isSubmitting">
				<spinner :size=4 />
				</span>
				Save
				</button>
			</div>
		</Form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { Form, Field } from 'vee-validate'
	import Spinner from '@/components/form/Spinner'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'SaveDocumentModalComponent',
		data: () => ({
			name: ''
		}),
		created() {
			/*watch for document name changes and update name*/
			const documentStore = useDocumentStore()
			this.$watch(
					() => documentStore.documentName,
					() => {
							this.name = documentStore.documentName
						}
					)
		},
		mounted() {
			const documentStore = useDocumentStore()
			this.name = documentStore.doc.name
		},
		methods: {
			cancel() {
				this.closeModal()
			},
			onSubmit(values, { setErrors }) {
				const documentStore = useDocumentStore()
				documentStore.setDocumentName(this.name)
				const { name } = values
				
				return documentStore.update(name)
					.then(() => {
						this.closeModal()
					})
					.catch(error => {
						const errors = {}
						const errorResponse = error.response
						
						if(Object.prototype.hasOwnProperty.call(errorResponse.data, 'message')) {
							errors.apiError = errorResponse.data.message
						}
						else {
							errors.apiError = "Network error. Try again later."
						}
						
						if(Object.prototype.hasOwnProperty.call(errorResponse.data, 'errors')) {
							const errorFields = Object.keys(errorResponse.data.errors)
							
							// insert laravel errors
							errorFields.map(field => {
								errors[field] = errorResponse.data.errors[field][0]
							});
						}
						
						setErrors(errors)
					});
			},
			closeModal() {
				this.$refs.closeModal.click()
			}
		}
	}
</script>