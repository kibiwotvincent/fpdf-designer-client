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
			Are you sure you want to delete <i>{{document.name}}</i>?
			</div>
			
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
				Yes, Delete
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
	import { useDocumentStore } from '@/stores'
	import { reactive } from 'vue'
    import { closeModal, formatAPIErrors } from '@/utils'
	
	export default {
		name: 'DeleteDocumentModalComponent',
		props: reactive({
				id: '',
				name: '',
				index: '',
		}),
		data: () => ({
			document: {},
			successMessage: ''
		}),
        mounted() {
            this.document.id = this.id
            this.document.name = this.name
            this.document.index = this.index
        },
		methods: {
			cancel() {
				this.reset()
				closeModal()
			},
			onSubmit(values, { setErrors }) {
				this.successMessage = ''
				const documentStore = useDocumentStore()
				return documentStore.delete(this.document.id)
					.then((response) => {
						this.successMessage = response.data.message
						this.$emit('deleted', this.document)
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