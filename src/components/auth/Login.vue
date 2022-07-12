<template>
    <section class="bg-gray-100 pb-8 pt-0 sm:pt-8 sm:mt-10">
      <div class="container mx-auto px-2 pt-0 sm:pt-4 pb-12 text-gray-800">
        <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          
          <div class="flex flex-col w-5/6 lg:w-3/6 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
            <form @submit.prevent="signIn()">
				<div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow p-6">
					<div class="w-full pb-8 pt-0 sm:pt-4 text-xl sm:text-3xl font-bold text-center">
						<img src="assets/images/logo-white-square.png" class="mx-auto hidden md:flex" />
						Login
					</div>
					<label for="email" class="">Email</label>
					<input type="email" id="email" v-model="input.email" class="w-full border rounded p-2 block mb-4 outline-none focus:shadow" />
					<label for="password">Password</label>
					<input type="password" id="password" v-model="input.password" class="w-full border rounded p-2 block outline-none focus:shadow" autocomplete="off" />
				</div>
				<div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6 pt-2">
					<div class="flex items-center justify-center">
						<button type="submit" class="secondary mx-auto lg:mx-0 hover:underline text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
							Sign In
						</button>
					</div>
					<div class="block sm:flex px-4">
						<div class="sm:w-3/6 text-center sm:text-left mb-2">
							<router-link to="/forgot-password" class="underline hover:underline text-gray-800 hover:text-pink-500">Forgot password?</router-link>
						</div>
						<div class="sm:w-3/6 text-center sm:text-right">
							<router-link to="/register" class="underline hover:underline text-gray-800 hover:text-pink-500">Register</router-link>
						</div>
					</div>
				</div>
			</form>
          </div>
          
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
		return {
			input: {
				email: "",
				password: ""
			}
		}
  },
  methods: {
	signIn() {
		if(this.input.email != "" && this.input.password != "") {
			if(this.input.email == 'vinkib2@gmail.com' && this.input.password == 'admin') {
				this.$store.commit("setAuthentication", true);
				this.$router.replace({ name: "dashboard" });
			}
			else {
				console.log("Email or password is incorrect. Try again!");
			}
		}
		else {
			console.log("Please enter email and password");
		}
	}
  },
  props: {
    
  }
}
</script>

<style scoped>
button {
	background: linear-gradient(90deg, #FF8369 0%, #FD6F95 100%);
}
</style>