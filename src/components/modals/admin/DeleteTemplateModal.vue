<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		
	})
</script>

<template>
	<modal id="deleteTemplateModal" size="small">
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<h2 class="w-full my-2 text-xl leading-tight text-center text-gray-600">
			Are you sure you want to delete {{template.name}} ?
			</h2>
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
				Yes, Delete
				</button>
			</div>
		</Form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { Form } from 'vee-validate'
	import Spinner from '@/components/form/Spinner'
	import createHttp from '@/axios.js'
	import { reactive } from 'vue'
	
	export default {
		name: 'DeleteTemplateModalComponent',
		props: reactive({
				id: '',
				name: '',
				index: '',
		}),
		data: () => ({
			template: {}
		}),
		methods: {
			cancel() {
				this.closeModal()
			},
			async onSubmit(values, { setErrors }) {
				const http = createHttp()
				return await http.post(process.env.VUE_APP_API_URL+'/api/admin/templates/'+this.template.id+'/delete')
					.then(() => {
						this.$emit('deleted', this.template)
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
		},
		watch: {
			id() {
				this.template.id = this.id
			},
			name() {
				this.template.name = this.name
			},
			index() {
				this.template.index = this.index
			}
		}
	}
</script>