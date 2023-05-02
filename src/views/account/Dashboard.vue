<script setup>
import Navbar from '@/components/account/Navbar.vue'
</script>

<template>
	<Navbar />
	<section class="bg-gray-100 py-8" style="margin-top: 60px">
		<div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
			<h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
				Dashboardd
			</h1>
		</div>
	</section>
</template>

<script>
export default {
  name: 'AccountDashboard',
}
</script>
