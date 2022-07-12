<script setup>
import Navbar from '@/components/common/Navbar.vue'
import Pricing from '@/components/homepage/Pricing.vue'
import CallToAction from '@/components/homepage/CallToAction.vue'
</script>

<template>
	<Navbar />
	<section class="bg-gray-100" style="margin-top: 60px"></section>
	<Pricing />
	<CallToAction />
</template>
<script>
export default {
  name: 'PricingPage',
  components: {
    
  }
}
</script>

<style>

</style>
