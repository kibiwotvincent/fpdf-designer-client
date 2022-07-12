<script setup>
import Hero from '../components/homepage/Hero.vue'
import Highlights from '../components/homepage/Highlights.vue'
import Steps from '../components/homepage/Steps.vue'
import Pricing from '../components/homepage/Pricing.vue'
import CallToAction from '../components/homepage/CallToAction.vue'

</script>

<template>
	<Hero />
	<Highlights />
	<Steps />
	<Pricing />
	<CallToAction />
</template>
<script>
export default {
  name: 'AppHomepage',
  components: {
    
  }
}
</script>

<style>

</style>
