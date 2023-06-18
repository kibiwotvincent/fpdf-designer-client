<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <Users />
    </div>
  </div>
</template>
<script>
import Users from '@/components/account/admin/UsersComponent.vue'

export default {
  components: {
    Users,
  },
};
</script>