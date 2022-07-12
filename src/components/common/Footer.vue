<template>
<footer class="bg-gray-100 text-center pb-2 p-4">
	<div class="container mx-auto px-8">
		<div class="w-full flex flex-col pt-6">
			<ul class="list-reset mb-6">
				<li class="mt-2 inline-block mx-2">
				<router-link to="/" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Home</router-link>
				</li>
				<li class="mt-2 inline-block mx-2">
				<router-link to="/pricing" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Pricing</router-link>
				</li>
				<li class="mt-2 inline-block mx-2">
				<router-link to="/help" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</router-link>
				</li>
				<li class="mt-2 inline-block mx-2">
				<router-link to="/privacy-policy" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy Policy</router-link>
				</li>
				<li class="mt-2 inline-block mx-2">
				<router-link to="/contact-us" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact Us</router-link>
				</li>
			</ul>
		</div>
	</div>
	<router-link to="/" class="text-gray-500">© 2022 FPDF-DESIGNER. All rights reserved.</router-link>
</footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    
  }
}
</script>
