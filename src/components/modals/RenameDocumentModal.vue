<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		name: Yup.string().required()
	})
</script>

<template>
	<modal id="renameDocumentModal" size="small">
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<label class="block">Edit Document Name</label>
			<Field type="text" name="name" v-model="document.name" :class="{ 'is-invalid': errors.name }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
			<div class="text-danger">{{errors.name}}</div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-between mt-3">
				<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">
				Close
				</button>
				<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				Cancel
				</button>
				<button class="bg-red-400 text-white rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<span v-show="isSubmitting">
				<spinner :size=4 />
				</span>
				Rename
				</button>
			</div>
		</Form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import Alert from '@/components/common/Alert.vue'
	import { Form, Field } from 'vee-validate'
	import Spinner from '@/components/form/Spinner'
	import { useDocumentStore } from '@/stores'
	import { reactive } from 'vue'
	
	export default {
		name: 'RenameDocumentModalComponent',
		props: reactive({
				id: '',
				name: '',
				index: '',
		}),
		data: () => ({
			document: {},
			successMessage: ''
		}),
		methods: {
			cancel() {
				this.reset()
				this.closeModal(0)
			},
			onSubmit(values, { setErrors }) {
				this.successMessage = ''
				const documentStore = useDocumentStore()
				return documentStore.rename(this.document.id, this.document.name)
					.then((response) => {
						this.successMessage = response.data.message
						this.$emit('renamed', this.document)
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
			reset() {
				this.successMessage =  ''
			},
			closeModal(delay = 1000) {
				var self = this
				//delay closing of modal for 1 second
				setTimeout(function() {
					self.reset()
					self.$refs.closeModal.click()
				}, delay)
			}
		},
		watch: {
			id() {
				this.document.id = this.id
			},
			name() {
				this.document.name = this.name
			},
			index() {
				this.document.index = this.index
			}
		}
	}
</script>