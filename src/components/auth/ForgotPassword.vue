<template>
    <section class="bg-gray-100 pb-8 pt-0 sm:pt-8 sm:mt-10">
      <div class="container mx-auto px-2 pt-0 sm:pt-4 pb-12 text-gray-800">
        <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          
          <div class="flex flex-col w-5/6 lg:w-3/6 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
            <form>
				<div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow p-6">
					<div class="w-full pb-8 pt-0 sm:pt-4 text-xl sm:text-3xl font-bold text-center">
						<img src="assets/images/logo-white-square.png" class="mx-auto hidden md:flex" />
						Password Reset
					</div>
					<label for="email" class="">Enter Email</label>
					<input type="email" id="email" class="w-full border rounded p-2 block mb-4 outline-none focus:shadow" />
				</div>
				<div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6 pt-2">
					<div class="flex items-center justify-center">
						<button class="secondary mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
							Reset Password
						</button>
					</div>
					<div class="w-full text-center">
						<router-link to="/login" class="underline hover:underline text-gray-800 hover:text-pink-500">Login</router-link>
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
  name: 'ForgotPassword',
  props: {
    
  }
}
</script>
