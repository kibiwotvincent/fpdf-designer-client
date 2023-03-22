<script setup>
	import { ArrowRightIcon } from '@heroicons/vue/20/solid'
</script>

<template>
    <div class="flex justify-between">
		<div class="inline-block pt-4">
			<input
				class="relative float-left mt-1 mr-1 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-red-400 dark:checked:border-red-400 checked:bg-red-400 dark:checked:bg-red-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
				type="checkbox"
				id="inlineCheckbox1"
				value="invoices"
				checked		
				/>
			<label
				class="inline-block pl-1 hover:cursor-pointer"
				for="inlineCheckbox1"
				>Invoice Templates</label
			>
		</div>
		<router-link to="/design-panel">
			<button class="bg-red-400 hover:underline text-white rounded py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
				<ArrowRightIcon class="inline-block h-5 w-5"/>
				Build From Scratch
			</button>
		</router-link>
	</div>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading templates..." :show-text=true />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="template in templates" :key="template.id">
			<div
			class="block rounded-lg shadow-lg">
			<router-link :to="'/design-panel/'+template.id">
				<img
				class="rounded-lg w-full transform transition hover:scale-105 duration-300 ease-in-out"
				:src="template.url"
				:alt="template.id" />
			</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Spinner from '@/components/form/Spinner';
	export default {
		name: 'DocumentTemplates',
		components: {
			
		},
		data() {
			return {
				templates: [],
				isLoading: true
			}
		},
		mounted() {
			/*let config = config = {
				method: 'get',
				url: 'https://my.domain.com/v1/customers/' + item.id,
				headers: {
					'Authorization': 'Bearer ' + token,
					'Accept': 'application/json'
				}
			}*/
		
			axios
				.get(process.env.VUE_APP_API_URL+'/api/templates')
				.then((response) => {
					this.isLoading = false
					this.templates = response.data
				})
		},
		methods: {
			
		},
		computed: {
			
		}
	};
</script>

