<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blue-50">
      <div class="px-4 md:px-8 mx-auto w-full pt-4">
        <router-view />
		<div class="mt-8">
        <Footer />
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name: "AdminLayout",
  components: {
    Sidebar,
    Footer,
  },
}
</script>
