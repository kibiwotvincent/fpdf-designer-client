<script setup>
	import { ArrowRightIcon } from '@heroicons/vue/20/solid'
</script>

<template>
    <div class="flex justify-between">
		<div class="inline-block pt-4">
			<input
				class="relative float-left mt-1 h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] hover:cursor-pointer"
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
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="template in templates" :key="template.id">
			<div
			class="block rounded-lg shadow-lg">
			<a href="#!" data-te-ripple-init data-te-ripple-color="light">
				<img
				class="rounded-lg w-full"
				:src="template.url"
				:alt="template.id" />
			</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DocumentTemplates',
		components: {
			
		},
		data() {
			return {
				templates: [
							{'id':'1','url':'https://bytesbay.naet-tech.com/1.PNG'},
							{'id':'2','url':'https://bytesbay.naet-tech.com/1.PNG'},
							{'id':'3','url':'https://bytesbay.naet-tech.com/1.PNG'},
							{'id':'4','url':'https://bytesbay.naet-tech.com/1.PNG'},
							],
			}
		},
		mounted() {
			
		},
		methods: {
			
		},
		computed: {
			
		}
	};
</script>

