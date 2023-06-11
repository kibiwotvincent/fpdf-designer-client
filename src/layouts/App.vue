<template>
	<router-view />
	<Footer />
</template>
<script>
import Footer from "@/components/common/Footer.vue"
export default {
  name: "AppLayout",
  components: {
    Footer,
  },
}
</script>
