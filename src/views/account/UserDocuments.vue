<script setup>
import Navbar from '@/components/account/Navbar.vue'
import UserDocuments from '@/components/account/UserDocuments.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<template>
	<Navbar />
	<section class="bg-blue-50 py-8">
		<div class="container mx-auto pb-12 text-gray-800">
			<div class="bg-blue-50 py-8 px-4 mt-8">
				<div class="flex justify-between mb-4">
					<div class="inline-block pt-4">
						Saved Documents
						<router-link to="/admin/templates" class="text-red-400 ml-4">
						Templates
						</router-link>
					</div>
					<router-link to="/document/choose-template">
					<button class="bg-red-400 hover:underline text-white rounded py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
						<PlusIcon class="inline-block h-5 w-5 mb-1"/>
						Create New Document
					</button>
					</router-link>
				</div>
				<UserDocuments />
			</div>
		</div>
	</section>
</template>