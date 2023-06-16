<script setup>
	import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		//
	})
</script>

<template>
	<div class="p-4">
		<div class="flex justify-end">
			<button 
			class="bg-gray-200 hover:underline text-gray-600 rounded py-1 px-4 mr-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
			data-te-toggle="modal"
			data-te-target="#updateRoleModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
				<PencilSquareIcon class="inline-block h-5 w-5 mb-1"/>
				Edit Role
			</button>
			
			<button 
			class="border border-red-500 hover:underline text-red-500 rounded py-1 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
			data-te-toggle="modal"
			data-te-target="#deleteRoleModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
				<TrashIcon class="inline-block h-5 w-5 mb-1"/>
				Delete Role
			</button>
		</div>
		<div class="pt-4 text-gray-500 text-sm font-semibold border-b pb-1">
			Update role permissions
		</div>
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<div class="grid grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
				<div class="w-full pt-4" v-for="permission in all_permissions" :key="`${role.name}_${permission.name}`">
					<input
						class="relative float-left mt-0.5 mr-1 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-red-400 dark:checked:border-red-400 checked:bg-red-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
						type="checkbox"
						:id="`checkbox_${role.name}_${permission.name}`"
						value="permissions"
						:checked=roleHasPermission(permission.name)
						@change=updateRolePermission(permission.name)
						/>
					<label
						class="inline-block pl-1 hover:cursor-pointer text-gray-600"
						:for="`checkbox_${role.name}_${permission.name}`"
						>{{ permission.name }}</label>
				</div>
			</div>
			<div class="text-danger mt-2">{{errors.permissions}}</div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-end mt-2">
				<button class="bg-red-400 text-white rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<span v-show="isSubmitting">
				<spinner :size=4 />
				</span>
				Update Role Permissions
				</button>
			</div>
		</Form>
	</div>
</template>

<script>
	import Alert from '@/components/common/Alert.vue'
	import { Form } from 'vee-validate'
	import Spinner from '@/components/form/Spinner'
	import createHttp from '@/axios.js'
	import { reactive } from 'vue'
	
	export default {
		name: 'RoleComponent',
		props: reactive({
					role_id: null,
					role: null,
					all_permissions: null,
				}),
		data: () => ({
			permissions: [],
			successMessage: ''
		}),
		watch: {
			//watch for role changes
			role() {
				this.permissions = this.role.permissions
			}
		},
		mounted() {
			this.permissions = this.role.permissions
		},
		methods: {
			roleHasPermission(permission) {
				return this.role.permissions.length !== 0 && this.role.permissions.includes(permission)
			},
			updateRolePermission(permission) {
				if(this.permissions.includes(permission)) {
					//remove permission
					this.permissions.splice(this.permissions.indexOf(permission), 1)
				}
				else {
					//add permission
					this.permissions.push(permission)
				}
			},
			async onSubmit(values, { setErrors }) {
				this.successMessage =  ''
				const http = createHttp()
				return await http.post(process.env.VUE_APP_API_URL+'/api/admin/roles/'+this.role_id+'/update', {'permissions': this.permissions})
					.then((response) => {
						this.successMessage = response.data.message
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
			}
		}
	}
</script>