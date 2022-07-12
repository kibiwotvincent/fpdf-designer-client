<script setup>
	import {onMounted} from 'vue'
	onMounted(() =>  {
		var navMenuDiv = document.getElementById("nav-content");
		var navMenu = document.getElementById("nav-toggle");
		
		document.onclick = check;
		function check(e) {
			var target = (e && e.target) || (event && event.srcElement);

			//Nav Menu
			if (!checkParent(target, navMenuDiv)) {
			// click NOT on the menu
			if (checkParent(target, navMenu)) {
				// click on the link
				if (navMenuDiv.classList.contains("hidden")) {
				navMenuDiv.classList.remove("hidden");
				} else {
				navMenuDiv.classList.add("hidden");
				}
			} else {
				// click both outside link and outside menu, hide menu
				navMenuDiv.classList.add("hidden");
			}
			}
		}
        function checkParent(t, elm) {
			while (t.parentNode) {
				if (t == elm) {
					return true;
				}
				t = t.parentNode;
			}
			return false;
        }

	})
</script>

<template>
	<nav id="header" class="fixed w-full z-30 top-0 bg-white shadow pt-4 sm:pt-0">
		<div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
			<div class="flex items-center">
				<router-link to="/" class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
					<img id="logo-black" class="logo" src="assets/images/logo-black.png" />
				</router-link>
			</div>
			<div class="block lg:hidden pr-4">
				<button id="nav-toggle" class="flex-wrap items-center p-1 text-pink-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
					<svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div class="w-full flex lg:flex items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-gray-800 lg:text-white p-4 lg:p-0 z-20" id="nav-content">
				<ul class="list-reset lg:flex justify-end flex-1 items-center">
					<li class="mr-3">
					<router-link to="/design-panel" class="nav-link inline-block no-underline text-gray-800 hover:text-pink-500 hover:text-underline py-2 px-4">Design Panel</router-link>
					</li>
					<li class="mr-3">
					<router-link to="/pricing" class="nav-link inline-block no-underline text-gray-800 hover:text-pink-500 hover:text-underline py-2 px-4">Pricing</router-link>
					</li>
					<li class="mr-3">
					<router-link to="/help" class="nav-link inline-block no-underline text-gray-800 hover:text-pink-500 hover:text-underline py-2 px-4">Help</router-link>
					</li>
				</ul>
			</div>

			<div class="lg:flex items-right hidden">
				<router-link to="/dashboard">
					<button id="navAction" class="secondary mr-3 hover:underline bg-white text-white-800 font-bold rounded mt-4 lg:mt-0 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Account</button>
				</router-link>
			</div>

		</div>
		<hr class="border-b border-gray-100 opacity-20 my-0 py-0" />
	</nav>
</template>

<script>
	//import MenuItems from '../common/MenuItems.vue'
	export default {
		name: 'AppNavbar',
		props: {
		
		},
		components: {
			//MenuItems
		}
	}
</script>
