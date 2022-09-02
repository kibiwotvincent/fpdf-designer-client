<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import Spinner from '@/components/form/Spinner';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required('password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

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
}
</script>

<template>
    <section class="bg-gray-100 pb-8 pt-0 sm:pt-8 sm:mt-10">
      <div class="container mx-auto px-2 pt-0 sm:pt-4 pb-12 text-gray-800">
        <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          
          <div class="flex flex-col w-5/6 lg:w-3/6 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
				<div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow p-6" >
					<div class="w-full pb-8 pt-0 sm:pt-4 text-xl sm:text-3xl font-bold text-center">
						<img src="assets/images/logo-white-square.png" class="mx-auto hidden md:flex" />
						Register
					</div>
					
					<label for="email" class="">Email</label>
					<Field type="text" id="email" name="email" :class="{ 'is-invalid': errors.email }" class="w-full border rounded p-2 block outline-none focus:shadow" />
					<div class="text-danger">{{errors.email}}</div>
					
					<div class="mb-4"></div>
					
					<label for="password" class="pt-4">Password</label>
					<Field type="password" id="password" name="password" :class="{ 'is-invalid': errors.password }" autocomplete="off" class="w-full border rounded p-2 block outline-none focus:shadow" />
					<div class="text-danger">{{errors.password}}</div>
					
					<div class="mb-4"></div>
					
					<label for="password" class="pt-4">Confirm Password</label>
					<Field type="password" id="password_confirmation" name="password_confirmation" :class="{ 'is-invalid': errors.password_confirmation }" autocomplete="off" class="w-full border rounded p-2 block outline-none focus:shadow" />
					<div class="text-danger">{{errors.password_confirmation}}</div>
				
					<div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
				</div>
				
				<div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6 pt-2">
					<div class="flex items-center justify-center">
						<button :disabled="isSubmitting" type="submit" class="secondary mx-auto lg:mx-0 hover:underline text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
							<span v-show="isSubmitting"><spinner /></span>
							Register
						</button>
					</div>
					<div class="w-full text-center">
						<router-link to="/login" class="underline hover:underline text-gray-800 hover:text-pink-500">Login</router-link>
					</div>
				</div>
			</Form>
          </div>
          
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'RegisterPage',
}
</script>

<style scoped>
.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
.alert {
    position: relative;
    padding: 0.60rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}
</style>