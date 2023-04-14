<script setup>
import Navbar from '@/components/account/Navbar.vue'
import UserDocuments from '@/components/account/UserDocuments.vue'
</script>

<template>
	<Navbar />
	<section class="bg-blue-50 py-8">
		<div class="container mx-auto pb-12 text-gray-800">
			<div class="bg-blue-50 py-8 px-4 mt-8">
				<UserDocuments />
			</div>
		</div>
	</section>
</template>