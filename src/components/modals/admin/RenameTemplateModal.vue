<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		//
	})
</script>

<template>
	<modal>
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<label class="block">Edit Template Name</label>
			<Field type="text" name="name" v-model="template.name" :class="{ 'is-invalid': errors.name }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
			<div class="text-danger">{{errors.name}}</div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-between mt-3">
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
	import createHttp from '@/axios.js'
	import { reactive } from 'vue'
    import { closeModal, formatAPIErrors } from '@/utils'
	
	export default {
		name: 'RenameTemplateModalComponent',
		props: reactive({
				id: '',
				name: '',
				index: '',
		}),
		data: () => ({
			template: {},
			successMessage: ''
		}),
        mounted() {
				this.template.id = this.id
				this.template.name = this.name
				this.template.index = this.index
        },
		methods: {
			cancel() {
				this.reset()
				closeModal()
			},
			async onSubmit(values, { setErrors }) {
				this.successMessage = ''
				const http = createHttp()
				return await http.post(process.env.VUE_APP_API_URL+'/api/admin/templates/'+this.template.id+'/rename', {'name': this.template.name})
					.then((response) => {
						this.successMessage = response.data.message
						this.$emit('renamed', this.template)
						closeModal(1500, this)
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