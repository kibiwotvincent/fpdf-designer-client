<script setup>
	import * as Yup from 'yup'
	
	const schema = Yup.object().shape({
		//
	})
</script>

<template>
	<modal>
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
			<label class="block">Your API Key</label>
			<div class="mt-2 relative flex flex-wrap items-stretch">
        <Field type="text" readonly name="key" v-model="key" class="block w-[80%] rounded-l border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
                <button 
                class="w-[20%] bg-red-400 hover:underline text-white rounded-r py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                @click.prevent="copyApiKey()"
                >
                    Copy
                </button>
      </div>
      <div class="text-danger">{{errors.name}}</div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-between mt-2">
				<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				Close
				</button>
				<button class="bg-red-400 text-white rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<span v-show="isSubmitting">
				<spinner :size=4 />
				</span>
				Generate New API Key
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
    import { closeModal, formatAPIErrors } from '@/utils'
	
	export default {
		name: 'ApiKeyModalComponent',
		data: () => ({
      key: '',
			successMessage: ''
		}),
    mounted() {
      const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/api-key')
					.then((response) => {
						this.key = response.data.api_key
					})
    },
		methods: {
			cancel() {
				closeModal()
			},
      copyApiKey() {
				closeModal()
			},
			async onSubmit(values, { setErrors }) {
				this.successMessage =  ''
				const http = createHttp()
				return await http.post(process.env.VUE_APP_API_URL+'/api/api-key')
					.then((response) => {
						this.successMessage = response.data.message
						this.key = response.data.api_key
					})
					.catch(error => {
						setErrors(formatAPIErrors(error.response))
					});
			},
			reset() {
				this.role = {}
				this.successMessage =  ''
			}
		}
	}
</script>