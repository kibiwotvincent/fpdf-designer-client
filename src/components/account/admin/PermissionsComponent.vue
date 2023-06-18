<script setup>
	import Spinner from '@/components/form/Spinner'
	import { PlusIcon } from '@heroicons/vue/20/solid'
	import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'
	import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
	import Alert from '@/components/common/Alert'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-2.5 text-gray-700 text-sm font-semibold uppercase">
			User Permissions
		</div>
		<div>
		<router-link to="/admin/roles">
			<a href="#" class="mr-4 text-sm font-semibold text-red-400 hover:underline">
			<WrenchScrewdriverIcon class="inline-block h-4 w-4 mb-1" /> Manage User Roles
			</a>
		</router-link>
		<button 
		class="bg-red-400 hover:underline text-white rounded py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
		data-te-toggle="modal"
		data-te-target="#newPermissionModal"
		>
			<PlusIcon class="inline-block h-5 w-5 mb-1"/>
			Add New Permission
		</button>
		</div>
		<NewPermissionModal @added="fetchPermissions"/>
	</div>
	
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading user permissions..." :show-text=true />
	</div>
	
	<div v-if="isLoading === false && permissions.length === 0">
		<Alert type="warning" message="No permissions to display yet!" />
	</div>
	
	<div v-if="!isLoading && permissions.length > 0" class="bg-white rounded px-4 py-4">
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
			<div class="w-full" v-for="permission, index in permissions" :key="`permission_${permission.name}`">
				<div class="text-gray-600">
					<span class="mr-1 text-md font-bold text-gray-500">{{ index+1 }}.</span>
					{{ permission.name }}
					<button
						data-te-toggle="modal"
						data-te-target="#updatePermissionModal"
						@click=setActivePermission(permission.id)
						>
						<PencilSquareIcon class="inline-block h-4 w-4 mb-1 ml-4 text-gray-700 hover:cursor-pointer"/></button>
					<button
						data-te-toggle="modal"
						data-te-target="#deletePermissionModal"
						@click=setActivePermission(permission.id)
						>
						<TrashIcon class="inline-block h-4 w-4 mb-1 ml-2 text-red-400 hover:cursor-pointer"/></button>
				</div>
			</div>
		</div>
		<UpdatePermissionModal :id=active_permission.id :name=active_permission.name @updated="fetchPermissions" />
		<DeletePermissionModal :id=active_permission.id :name=active_permission.name @deleted="fetchPermissions" />
	</div>
</template>

<script>
	import createHttp from '@/axios.js'
	import NewPermissionModal from '@/components/account/admin/NewPermissionModal.vue'
	import UpdatePermissionModal from '@/components/account/admin/UpdatePermissionModal.vue'
	import DeletePermissionModal from '@/components/account/admin/DeletePermissionModal.vue'
	
	export default {
		name: 'PermissionsComponent',
		components: {
			NewPermissionModal,
			UpdatePermissionModal,
			DeletePermissionModal,
		},
		data() {
			return {
				permissions: [],
				active_permission: {},
				isLoading: true,
			}
		},
		mounted() {
			this.fetchPermissions()
		},
		methods: {
			setActivePermission(permissionID) {
				let activePermission = this.permissions.filter(function(permission) {
					return permission.id == permissionID
				})
				this.active_permission = activePermission[0]
			},
			async fetchPermissions() {
				this.isLoading = true
				this.permissions = []
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/admin/permissions')
					.then((response) => {
						this.isLoading = false
						this.permissions = response.data
						this.active_permission = this.permissions[0]
					})
			}
		}
	};
</script>

