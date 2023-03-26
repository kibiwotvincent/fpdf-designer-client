<script setup>
import Navbar from '@/components/account/Navbar.vue'
import UserDocuments from '@/components/account/UserDocuments.vue'
</script>

<template>
	<Navbar />
	<section class="bg-gray-100 py-8 mt-[60px]">
		<div class="container mx-auto pt-4 pb-12 text-gray-800">
			<h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
				Choose a template for your document
			</h2>
			<h4 class="w-1/2 mx-auto mt-2 mb-8 leading-tight text-center text-gray-600">
				You can build a document from scratch if you can't find a template that suits you.
			</h4>
			<div class="bg-blue-50 py-8 px-4 mt-8">
				<UserDocuments />
			</div>
		</div>
	</section>
</template>