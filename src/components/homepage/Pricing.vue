<template>
    <section class="bg-gray-100 py-8" id="pricing">
      <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <h1 class="w-full my-2 text-4xl sm:text-5xl font-bold leading-tight text-center text-gray-800">
          Pricing
        </h1>
        <div class="w-full mb-4">
          <div class="h-1 mx-auto purple-gradient w-64 opacity-50 my-0 py-0 rounded-t"></div>
        </div>
		<h4 class="w-1/2 mx-auto mt-2 mb-8 leading-tight text-center text-gray-600">
			Once you design your document to satisfaction, consume it from your application using the API.
		</h4>
			
        <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
            <div class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
              <div class="p-8 text-3xl font-bold text-center border-b-4">
                {{ subscriptions.first.title }}
              </div>
              <ul class="w-full text-center text-sm">
                <li class="border-b py-4" v-for="item in subscriptions.first.items" :key="item.id">{{ item }}</li>
              </ul>
            </div>
            <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div class="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                ${{ subscriptions.first.price }}
              </div>
              <div class="flex items-center justify-center">
                <button class="secondary mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
            <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full p-8 text-3xl font-bold text-center">{{ subscriptions.second.title }}</div>
              <div class="h-1 w-full secondary my-0 py-0 rounded-t"></div>
              <ul class="w-full text-center text-base font-bold">
                <li class="border-b py-4" v-for="item in subscriptions.second.items" :key="item.id">{{ item }}</li>
              </ul>
            </div>
            <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div class="w-full pt-6 text-4xl font-bold text-center">
                ${{ subscriptions.second.price }}
              </div>
              <div class="flex items-center justify-center">
                <button class="secondary mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
            <div class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
              <div class="p-8 text-3xl font-bold text-center border-b-4">
                {{ subscriptions.last.title }}
              </div>
              <ul class="w-full text-center text-sm">
                <li class="border-b py-4" v-for="item in subscriptions.last.items" :key="item.id">{{ item }}</li>
              </ul>
            </div>
            <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div class="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                ${{ subscriptions.last.price }}
              </div>
              <div class="flex items-center justify-center">
                <button class="secondary mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import createHttp from '@/axios.js'
  
export default {
  name: 'HomepagePricing',
  data() {
    return {
      subscriptions : {first: {}, second: {}, last: {}},
    }
  },
  mounted() {
    const http = createHttp()
    http.get(process.env.VUE_APP_API_URL+'/api/pricing')
      .then((response) => {
        this.subscriptions.first = response.data[0]
        this.subscriptions.second = response.data[1]
        this.subscriptions.last = response.data[2]
      })
  },
}
</script>
