<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		name: Yup.string().required()
	})
</script>

<template>
	<modal>
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
    import { closeModal, formatAPIErrors } from '@/utils'
	
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
				return documentStore.rename(this.document.id, this.document.name)
					.then((response) => {
						this.successMessage = response.data.message
						this.$emit('renamed', this.document)
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