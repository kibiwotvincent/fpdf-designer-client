<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <UserDocuments />
    </div>
  </div>
</template>
<script>
import UserDocuments from '@/components/account/UserDocuments.vue'

export default {
	name: 'AccountDashboard',
	components: {
		UserDocuments,
	},
}
</script>