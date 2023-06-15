<script setup>
	import Spinner from '@/components/form/Spinner'
	import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-4 text-gray-700 text-sm font-semibold uppercase">
			User Roles & Permissions
		</div>
		<button 
		class="bg-red-400 hover:underline text-white rounded py-1 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
		data-te-toggle="modal"
		data-te-target="#newRoleModal"
		data-te-ripple-init
		data-te-ripple-color="light"
		>
			<PlusIcon class="inline-block h-5 w-5 mb-1"/>
			Add New Role
		</button>
	</div>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading user roles & permissions..." :show-text=true />
	</div>
	
		
	<!--Roles Tabs-->
	<div v-if=!isLoading class="bg-white rounded">
		<ul
		class="mt-4 mb-0 flex list-none flex-row flex-wrap border-b-0 pl-0"
		role="tablist"
		data-te-nav-ref>
			<li role="presentation">
				<a
				:href="'#tabs-'+roles[0].name"
				class="rounded-tl block bg-gray-50 border-x-0 border-b-2 border-t-0 px-7 pb-3 pt-4 text-xs font-bold uppercase leading-tight text-gray-500 hover:isolate hover:border-transparent hover:bg-red-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-red-400 data-[te-nav-active]:text-red-400"
				data-te-toggle="pill"
				:data-te-target="'#tabs-'+roles[0].name"
				data-te-nav-active
				role="tab"
				:aria-controls="'tabs-'+roles[0].name"
				:aria-selected="true"
				@click="setActiveRole(roles[0].id)"
				>{{ roles[0].name }}</a>
			</li>
			<li role="presentation" v-for="role in roles.filter((role, index) => index > 0)" :key=role.id>
				<a
				:href="'#tabs-'+role.name"
				class="block bg-gray-50 border-x-0 border-b-2 border-t-0 px-7 pb-3 pt-4 text-xs font-bold uppercase leading-tight text-gray-500 hover:isolate hover:border-transparent hover:bg-red-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-red-400 data-[te-nav-active]:text-red-400"
				data-te-toggle="pill"
				:data-te-target="'#tabs-'+role.name"
				role="tab"
				:aria-controls="'tabs-'+role.name"
				:aria-selected="false"
				@click="setActiveRole(role.id)"
				>{{ role.name }}</a>
			</li>
		</ul>

		<!--Tabs content-->
		<div class="mb-6">
			<div
			class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
			:id="'tabs-'+roles[0].name"
			role="tabpanel"
			:aria-labelledby="'tabs-'+roles[0].name+'-tab'"
			data-te-tab-active
			>
				<RolePermissionsComponent :role_id=active_role.id :role=active_role :all_permissions=permissions />
			</div>
			<div
			v-for="role in roles.filter((role, index) => index > 0)" :key="'tab-content-'+role.id"
			class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
			:id="'tabs-'+role.name"
			role="tabpanel"
			:aria-labelledby="'tabs-'+role.name+'-tab'"
			>
				<RolePermissionsComponent :role_id=active_role.id :role=active_role :all_permissions=permissions />
			</div>
		</div>
	</div>
	<!-- End Roles Tab -->
	<NewRoleModal @added="fetchRoles"/>
</template>

<script>
	import createHttp from '@/axios.js'
	import NewRoleModal from '@/components/account/admin/NewRoleModal.vue'
	import { defineAsyncComponent } from 'vue'
	
	export default {
		name: 'RolesComponent',
		components: {
			NewRoleModal,
			RolePermissionsComponent: defineAsyncComponent(() => 
				import('@/components/account/admin/RolePermissionsComponent')
			),
		},
		data() {
			return {
				roles: [],
				active_role: {},
				permissions: [],
				isLoading: true,
				isLoadingPermissions: true,
			}
		},
		mounted() {
			this.fetchPermissions()
			this.fetchRoles()
		},
		methods: {
			setActiveRole(roleID) {
				let activeRole = this.roles.filter(function(role) {
					return role.id == roleID
				})
				this.active_role = activeRole[0]
			},
			async fetchRoles() {
				this.isLoading = true
				this.roles = []
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/admin/roles')
					.then((response) => {
						this.isLoading = false
						this.roles = response.data
						this.active_role = this.roles[0]
					})
			},
			async fetchPermissions() {
				this.isLoadingPermissions = true
				this.permissions = []
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/admin/permissions')
					.then((response) => {
						this.isLoadingPermissions = false
						this.permissions = response.data
					})
			}
		}
	};
</script>

