<template>
	<ul class="list-reset lg:flex justify-end flex-1 items-center">
		<li class="mr-3">
		<router-link to="/document/choose-template" class="nav-link inline-block no-underline hover:text-pink-500 hover:text-underline py-2 px-4">Design Panel</router-link>
		</li>
		<li class="mr-3">
		<router-link to="/pricing" class="nav-link inline-block no-underline hover:text-pink-500 hover:text-underline py-2 px-4">Pricing</router-link>
		</li>
		<li class="mr-3">
		<router-link to="/help" class="nav-link inline-block no-underline hover:text-pink-500 hover:text-underline py-2 px-4">Help</router-link>
		</li>
	</ul>
</template>

<script>
    
	export default {
		name: 'MenuItems',
		props: {
		
		},
		methods: {
			
		}
	}
</script>
