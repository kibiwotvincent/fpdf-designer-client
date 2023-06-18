<script setup>
	import Spinner from '@/components/form/Spinner'
	import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="pt-2.5 text-gray-700 text-sm font-semibold uppercase">
			Users
		</div>
	</div>
	
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading users..." :show-text=true />
	</div>
	
	<div v-if="!isLoading" class="bg-white rounded px-0 py-0 border-l border-r">
		<div class="block w-full overflow-x-auto">
			<table class="items-center w-full bg-transparent border-collapse">
				<thead>
					<tr>
					<th
					class="bg-gray-100 text-gray-700 px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
					>
					Name
					</th>
					<th
					class="bg-gray-100 text-gray-700 px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
					>
					Email
					</th>
					<th
					class="bg-gray-100 text-gray-700 px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
					>
					Subscription Status
					</th>
					<th
					class="bg-gray-100 text-gray-700 px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
					>
					Roles
					</th>
					<th
					class="bg-gray-100 text-gray-700 px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right"
					>
					Action
					</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in users" :key="user.id">
					<td
					class="border-b px-1 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-2"
					>
					{{ user.name ?? '--' }}
					</td>
					<td
					class="border-b px-1 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-2"
					>
					{{ user.email }}
					</td>
					<td
					class="border-b text-gray-600 border-t-0 px-1 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-2"
					>
					pending
					</td>
					<td
					class="border-b text-gray-600 border-t-0 px-1 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-"
					>
					{{ user.roles.join(', ') }}
					</td>
					<td
					class="border-b px-1 align-middle text-sm whitespace-nowrap p-2 text-right"
					>
						<button 
						class="text-red-400"
						data-te-toggle="modal"
						data-te-target="#updateUserRolesModal"
						@click=setActiveUser(user.id)
						>
							<AdjustmentsHorizontalIcon class="inline-block h-4 w-4 mb-1" />
						</button>
					</td>
					</tr>
				</tbody>
			</table>
		</div>
		<UpdateUserRolesModal :id=active_user.id :user=active_user :all_roles=roles />
	</div>
</template>

<script>
	import createHttp from '@/axios.js'
	import UpdateUserRolesModal from '@/components/account/admin/UpdateUserRolesModal.vue'
	
	export default {
		name: 'UsersComponent',
		components: {
			UpdateUserRolesModal
		},
		data() {
			return {
				users: [],
				active_user: {},
				isLoading: true,
				roles: []
			}
		},
		mounted() {
			this.fetchUsers()
			this.fetchRoles()
		},
		methods: {
			setActiveUser(userID) {
				let activeUser = this.users.filter(function(user) {
					return user.id == userID
				})
				this.active_user = activeUser[0]
			},
			async fetchUsers() {
				this.isLoading = true
				this.users = []
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/admin/users')
					.then((response) => {
						this.isLoading = false
						this.users = response.data
						this.active_user = this.users[0]
					})
			},
			async fetchRoles() {
				this.roles = []
				const http = createHttp()
				http.get(process.env.VUE_APP_API_URL+'/api/admin/roles')
					.then((response) => {
						this.roles = response.data
					})
			},
		}
	};
</script>

