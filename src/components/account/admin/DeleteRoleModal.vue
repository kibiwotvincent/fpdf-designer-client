<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		//
	})
</script>

<template>
	<modal>
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<div class="pt-4 text-gray-600 text-xl text-center pb-2">
				Are you sure you want to delete <i>{{ role.name }}</i> role?
			</div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-between mt-2">
				<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				Cancel
				</button>
				<button class="bg-red-400 text-white rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<span v-show="isSubmitting">
				<spinner :size=4 />
				</span>
				Delete Role
				</button>
			</div>
		</Form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import Alert from '@/components/common/Alert.vue'
	import { Form } from 'vee-validate'
	import Spinner from '@/components/form/Spinner'
	import createHttp from '@/axios.js'
	import { reactive } from 'vue'
    import { closeModal, formatAPIErrors } from '@/utils'
	
	export default {
		name: 'DeleteRoleModalComponent',
		props: reactive({
				id: null,
				name: null,
				}),
		data: () => ({
			role: {},
			successMessage: ''
		}),
		mounted() {
			this.role.id = this.id
			this.role.name = this.name
		},
		methods: {
			cancel() {
				this.reset()
				closeModal()
			},
			async onSubmit(values, { setErrors }) {
				this.successMessage =  ''
				const http = createHttp()
				return await http.post(process.env.VUE_APP_API_URL+'/api/admin/roles/'+this.role.id+'/delete', {})
					.then((response) => {
						this.successMessage = response.data.message
						this.$emit('deleted')
						closeModal(0, this)
                        
					})
					.catch(error => {
						setErrors(formatAPIErrors(error.response))
					});
			},
			reset() {
				this.successMessage =  ''
			}
		}
	}
</script>