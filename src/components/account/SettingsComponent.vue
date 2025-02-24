<script setup>
	import Spinner from '@/components/form/Spinner'
	import { LockOpenIcon } from '@heroicons/vue/20/solid'
    import { launchModal, modalIsActive } from '@/utils'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-2.5 text-gray-700 text-sm font-semibold uppercase">
			Settings
		</div>
		<div>
		<button 
		class="bg-red-400 hover:underline text-white rounded py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
		@click="launchModal('ApiKey')"
		>
			<LockOpenIcon class="inline-block h-5 w-5 mb-1"/>
			View API Key
		</button>
		</div>
	</div>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading user roles & permissions..." :show-text=true />
	</div>
	
	<div v-if=!isLoading class="bg-white rounded">
		<ul
		class="mt-4 mb-0 flex list-none flex-row flex-wrap border-b-0 pl-0"
		>
			<li role="presentation">
				<router-link to="/settings/profile" 
				:class="[
                  $route.params.category == 'profile'
                    ? 'block px-7 pb-3 pt-4 text-xs font-bold uppercase leading-tight text-red-400 border-x-0 border-b-2 border-t-0 border-red-400 hover:bg-red-100'
                    : 'block px-7 pb-3 pt-4 text-xs font-bold uppercase leading-tight text-gray-500 bg-gray-50 border-x-0 border-b-2 border-t-0 hover:text-red-400 hover:bg-red-100 hover:border-red-400',
                ]"     
                @click = "fetchRoles()"
                >Profile Settings
                </router-link>
			</li>
      <li role="presentation">
				<router-link to="/settings/payment" 
				:class="[
                  $route.params.category == 'payment'
                    ? 'block px-7 pb-3 pt-4 text-xs font-bold uppercase leading-tight text-red-400 border-x-0 border-b-2 border-t-0 border-red-400 hover:bg-red-100'
                    : 'block px-7 pb-3 pt-4 text-xs font-bold uppercase leading-tight text-gray-500 bg-gray-50 border-x-0 border-b-2 border-t-0 hover:text-red-400 hover:bg-red-100 hover:border-red-400',
                ]"     
                @click = "fetchRoles()"
                >Payment Settings
                </router-link>
			</li>
		</ul>

		<div class="mb-6 p-4">
			<ProfileSettings @refresh=fetchRoles />
		</div>
	</div>
	
	<ApiKeyModal v-if="modalIsActive('ApiKey')" />
</template>

<script>
	import createHttp from '@/axios.js'
	import ApiKeyModal from '@/components/account/settings/ApiKeyModal.vue'
	import ProfileSettings from '@/components/account/settings/ProfileSettingsComponent.vue'
	
	export default {
		name: 'SettingsComponent',
		components: {
		},
		data() {
			return {
				roles: [],
				role: {},
				isLoading: true,
			}
		},
		mounted() {
			this.fetchRoles()
		},
		methods: {
			async fetchRoles() {
				this.isLoading = true
				this.roles = []
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/admin/roles')
					.then((response) => {
						this.isLoading = false
						this.roles = response.data
					})
			}
		}
	};
</script>

