<script setup>
	import {onMounted} from 'vue'
	onMounted(() =>  {
		var scrollpos = window.scrollY;
		var header = document.getElementById("header");
		var navcontent = document.getElementById("nav-content");
		var navaction = document.getElementById("navAction");
		var toToggle = document.querySelectorAll(".toggleColour");
		var navLinks = document.querySelectorAll(".nav-link");
		var blackLogo = document.getElementById("logo-black");
		var whiteLogo = document.getElementById("logo-white");

		document.addEventListener("scroll", function () {
			/*Apply classes for slide in bar*/
			scrollpos = window.scrollY;

			if (scrollpos > 10) {
				header.classList.add("bg-white");
				navaction.classList.remove("bg-white");
				navaction.classList.add("gradient");
				/*Used to switch toggleColour colours*/
				for (let i = 0; i < toToggle.length; i++) {
					toToggle[i].classList.add("text-gray-800");
				}
				header.classList.add("shadow");
				navcontent.classList.remove("bg-gray-100");
				navcontent.classList.add("bg-white");
			
				/*change text color to black in nav links*/
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.add("text-gray-800");
				}

				whiteLogo.classList.add("hidden");
				blackLogo.classList.remove("hidden");
			
			} else {
				header.classList.remove("bg-white");
				navaction.classList.remove("gradient");
				navaction.classList.add("bg-white");
				navaction.classList.remove("text-white");

				header.classList.remove("shadow");
				navcontent.classList.remove("bg-white");
				navcontent.classList.add("bg-gray-100");
		
				/*remove black color that was added to nav links earlier*/
				for (let i = 0; i < navLinks.length; i++) {
					navLinks[i].classList.remove("text-gray-800");
				}
		
				blackLogo.classList.add("hidden");
				whiteLogo.classList.remove("hidden");
			}
		});
		
		/*make navbar responsive*/
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
	<nav id="header" class="fixed w-full z-30 top-0 text-white">
		<div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
			<div class="flex items-center">
				<router-link to="/" class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
					<img class="logo" id="logo-white" src="assets/images/logo-white.png" />
					<img class="logo hidden" id="logo-black" src="assets/images/logo-black.png" />
				</router-link>
			</div>
			<div class="block lg:hidden pr-4">
				<button id="nav-toggle" class="flex items-center p-1 text-pink-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
					<svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div class="w-full flex lg:flex items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-gray-800 lg:text-white p-4 lg:p-0 z-20" id="nav-content">
				<menu-items />
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
    import MenuItems from '../common/MenuItems.vue'
	export default {
		name: 'HomepageNavbar',
		props: {
		
		},
		components: {
			MenuItems
		}
	}
</script>
