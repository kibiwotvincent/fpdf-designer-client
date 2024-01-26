<script setup>
	import Spinner from '@/components/form/Spinner'
    import Alert from '@/components/common/Alert'
    import { PlusIcon, CheckIcon } from '@heroicons/vue/20/solid'
    import { PencilSquareIcon } from '@heroicons/vue/24/outline'
</script>

<template>
	<div class="flex justify-between mb-4">
		<div class="inline-block pt-4 text-gray-700 text-sm font-semibold uppercase">
			Subscriptions Plans
		</div>
		<router-link to="/admin/subscriptions/add" 
		class="bg-red-400 hover:underline text-white rounded py-1.5 px-4 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
		>
			<PlusIcon class="inline-block h-5 w-5 mb-1"/>
			Add New Subscription
		</router-link>
	</div>
	<div class="flex justify-center mt-8" v-show="isLoading">
	<Spinner :size=6 color="red-400" text="Loading available subscriptions..." :show-text=true />
	</div>
    <div v-if="isLoading === false && subscriptions.length === 0">
		<Alert type="warning" message="No subscriptions to display yet!" />
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center mt-4">
		<div class="w-full" v-for="subscription in subscriptions" :key="subscription.id">
			<div class="block rounded-lg bg-white mb-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
            :class="subscription.deleted ? 'bg-red-200' : ''"
            >
				<div class="px-4 py-2 border-b flex justify-between">
					<h6 class="mt-2 text-l font-bold leading-tight text-gray-700">
					{{ subscription.title }} 
                    <span class="text-gray-500">($ {{ subscription.price }})</span>
                    <span v-if="subscription.deleted" class="bg-red-500 text-white px-[0.2rem] ml-2 rounded text-sm">deleted</span>
					</h6>
					<div class="relative flex justify-end">
                        <router-link :to="'/admin/subscriptions/'+subscription.id">
                        <button class="text-red-400 py-1">
                            <PencilSquareIcon class="inline-block h-5 w-5 mb-1"/>
                        </button>
                        </router-link>
					</div>
				</div>
				<div class="relative p-4">
					<ul>
                        <li v-for="item,index in subscription.items" :key="subscription.id+index" class="block text-gray-700 mb-2">
                            <CheckIcon class="inline-block h-5 w-5 mb-1"/> {{ item }}
                        </li>
                    </ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { http, url } from '@/axios.js'
	
	export default {
		name: 'SubscriptionsComponent',
		data() {
			return {
				subscriptions: [],
				isLoading: true,
			}
		},
		mounted() {
			http().get(url('/api/admin/subscriptions'), {params: {all:true}})
				.then((response) => {
					this.isLoading = false
					this.subscriptions = response.data
				})
		}
	};
</script>

