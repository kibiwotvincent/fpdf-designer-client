<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		//
	})
</script>

<template>
	<modal id="updatePermissionModal" size="small">
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<label class="block">Permission Name</label>
			<Field type="text" name="name" v-model="permission.name" :class="{ 'is-invalid': errors.name }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
			<div class="text-danger">{{errors.name}}</div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-between mt-2">
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
				Update Permission
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
	import createHttp from '@/axios.js'
	import { reactive } from 'vue'
	
	export default {
		name: 'UpdatePermissionModalComponent',
		props: reactive({
				id: null,
				name: null,
				}),
		data: () => ({
			permission: {},
			successMessage: ''
		}),
		watch: {
			id() {
				this.permission.id = this.id
				this.permission.name = this.name
			}
		},
		mounted() {
			this.permission.id = this.id
			this.permission.name = this.name
		},
		methods: {
			cancel() {
				this.reset()
				this.closeModal()
			},
			async onSubmit(values, { setErrors }) {
				this.successMessage =  ''
				const http = createHttp()
				return await http.post(process.env.VUE_APP_API_URL+'/api/admin/permissions/'+this.permission.id+'/update', {'name': this.permission.name})
					.then((response) => {
						this.successMessage = response.data.message
						this.$emit('updated')
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
			closeModal() {
				var self = this
				//delay closing of modal for 1 second
				setTimeout(function() {
					self.reset()
					self.$refs.closeModal.click()
				}, 1000)
			}
		}
	}
</script>