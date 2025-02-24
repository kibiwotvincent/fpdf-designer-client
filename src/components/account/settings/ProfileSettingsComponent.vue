<script setup>
    import * as Yup from 'yup'
    import { PlusIcon,TrashIcon } from '@heroicons/vue/20/solid'
	
	const schema = Yup.object().shape({
		//
	})
</script>

<template>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" >
			<label class="block text-gray-700">Title</label>
			<Field type="text" name="title" v-model="subscription.title" :class="{ 'is-invalid': errors.title }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
			<div class="text-danger">{{errors.title}}</div>
            
			<label class="block text-gray-700 mt-4">Description</label>
			<textarea name="description" v-model="subscription.description" :class="{ 'is-invalid': errors.description }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
			<div class="text-danger">{{errors.description}}</div>
			
            <div class="grid grid-cols-3 gap-4 justify-items-center">
                <div class="w-full">
                    <label class="block text-gray-700 mt-4">Price</label>
                    <Field type="number" name="price" v-model="subscription.price" :class="{ 'is-invalid': errors.price }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
                    <div class="text-danger">{{errors.price}}</div>
                </div>
                <div class="w-full">
                    <label class="block text-gray-700 mt-4">Duration</label>
                    <Field type="number" name="duration" v-model="subscription.duration" :class="{ 'is-invalid': errors.duration }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
                    <div class="text-danger">{{errors.duration}}</div>
                </div>
                <div class="w-full">
                    <label class="block text-gray-700 mt-4">Duration Type</label>
                    <Field type="text" name="duration_type" v-model="subscription.duration_type" :class="{ 'is-invalid': errors.duration_type }" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
                    <div class="text-danger">{{errors.duration_type}}</div>
                </div>
            </div>
            
            <label class="block text-gray-700 mt-4">Items</label>
            <div v-for="item, index in subscription.items" :key=index>
            <div class="mt-2 relative flex flex-wrap items-stretch">
                <Field type="text" :name="'items'+index" v-model="subscription.items[index]" :class="{ 'is-invalid': errors['items'+index] }" class="block w-[90%] rounded-l border border-solid border-neutral-300 px-3 py-1.5 text-neutral-700 outline-none focus:shadow" />
                <button 
                class="w-[10%] bg-red-400 hover:underline text-white rounded-r py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                @click.prevent="addItem()"
                v-if="subscription.items.length == index+1"
                >
                    <PlusIcon class="inline-block h-5 w-5 mb-1"/>
                </button>
                <button 
                class="w-[10%] bg-red-400 hover:underline text-white rounded-r py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                @click.prevent="removeItem(index)"
                v-if="index < subscription.items.length-1"
                >
                    <TrashIcon class="inline-block h-5 w-5 mb-1"/>
                </button>
            </div>
            <div class="text-danger">{{errors['items'+index]}}</div>
            </div>
			
			<div v-if="errors.apiError">
				<Alert :message=errors.apiError type="danger" />
			</div>
			<div v-if="successMessage !== ''">
				<Alert :message=successMessage type="success" />
			</div>
			
			<div class="flex justify-between mt-4">
                <router-link to="/admin/subscriptions">
                    <button type="button" class="bg-gray-200 text-gray-700 rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    Cancel
                    </button>
                </router-link>
				<button class="bg-red-400 text-white rounded mt-4 py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<span v-show="isSubmitting">
				<spinner :size=4 />
				</span>
				Add Subscription
				</button>
			</div>
		</Form>
</template>

<script>
	import Alert from '@/components/common/Alert.vue'
	import { Form, Field } from 'vee-validate'
	import Spinner from '@/components/form/Spinner'
	import { http, url } from '@/axios.js'
    import { formatAPIErrors } from '@/utils'
	
	export default {
		name: 'AddSubscriptionComponent',
		data() {
			return {
                subscription: {'items':['']},
				successMessage: '',
			}
		},
		methods: {
            async onSubmit(values, { setErrors }) {
				this.successMessage =  ''
				return await http().post(url('/api/admin/subscriptions'), this.subscription)
					.then((response) => {
						this.successMessage = response.data.message
					})
					.catch(error => {
						setErrors(formatAPIErrors(error.response))
					});
			},
            addItem() {
                this.subscription.items.push('')
            },
            removeItem(index) {
                this.subscription.items.splice(index, 1)
            }
		}
	};
</script>

