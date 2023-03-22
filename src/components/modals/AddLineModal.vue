<script setup>
//import { Form, Field } from 'vee-validate';
//import * as Yup from 'yup';
//import Spinner from '@/components/form/Spinner';

//import { useAuthStore } from '@/stores';

/*const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required('password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});*/
/*
function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { email, password, password_confirmation } = values;

    return authStore.register(email, password, password_confirmation)
        .catch(errorResponse => {
			const errors = {};
			errors.apiError = errorResponse.data.message;
			
			if(Object.prototype.hasOwnProperty.call(errorResponse.data, 'errors')) {
				let errorFields = Object.keys(errorResponse.data.errors);
				
				// insert laravel errors
				errorFields.map(field => {
					errors[field] = errorResponse.data.errors[field][0];
				});
			}
			
			setErrors(errors);
		});
}*/
</script>
<template>
	<modal title="Add Line" id="addLineModal">
		<form @submit="onSubmit">
		<input type="hidden" v-model="draggable.type"/>
		<input type="hidden" v-model="draggable.height"/>
		<div class="">
			<label class="block">Color</label>
			<input type="color" v-model="draggable.color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Left</label>
					<input type="number" v-model="draggable.left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Top</label>
					<input type="number" v-model="draggable.top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Weight</label>
					<input type="number" v-model="draggable.weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Width</label>
					<input type="number" v-model="draggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
		</div>
		<div class="flex justify-end">
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Line
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/Modal.vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'AddLineModalComponent',
		components: {
				Modal
			},
		props: {
			document: document,
		},
		data: () => ({
				draggable: {
					'type' : 'line',
					'left' : '0',
					'top' : '0',
					'height' : '50',
					'width' : '400',
					'weight' : '0.2',
					'color' : '#333333',
				},
			}),
		methods: {
			onSubmit(e) {
				e.preventDefault()
				this.draggable.left = parseInt(this.draggable.left)
				this.draggable.top = parseInt(this.draggable.top)
				this.draggable.height = parseInt(this.draggable.height)
				this.draggable.width = parseInt(this.draggable.width)
				this.draggable.weight = parseInt(this.draggable.weight)
				
				const documentStore = useDocumentStore()
				documentStore.addDraggable(this.draggable)
			}
		}
	}
</script>

<style scoped>

</style>