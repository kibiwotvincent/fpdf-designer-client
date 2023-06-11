<template>
<footer class="block py-4 border-t">
    <div class="container mx-auto px-4 py-2">
		<div
			class="flex flex-wrap items-center md:justify-between justify-center"
		>
        <div class="w-full md:w-6/12 px-4">
			<span class="text-sm text-gray-700">© {{ date }} FPDF-DESIGNER. All rights reserved.</span>
		</div>
		<div class="w-full md:w-6/12 px-4">
			<ul class="flex flex-wrap list-none justify-end">
				<li class="inline-block mx-2">
				<router-link to="/" class="text-sm no-underline hover:underline text-gray-800 hover:text-red-400">Home</router-link>
				</li>
				<li class="inline-block mx-2">
				<router-link to="/pricing" class="text-sm no-underline hover:underline text-gray-800 hover:text-red-400">Pricing</router-link>
				</li>
				<li class="inline-block mx-2">
				<router-link to="/privacy-policy" class="text-sm no-underline hover:underline text-gray-800 hover:text-red-400">Privacy Policy</router-link>
				</li>
				<li class="inline-block mx-2">
				<router-link to="/contact-us" class="text-sm no-underline hover:underline text-gray-800 hover:text-red-400">Contact Us</router-link>
				</li>
			</ul>
		</div>
		</div>
	</div>
	
</footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
}
</script>
