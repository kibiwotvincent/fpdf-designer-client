<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <Permissions />
    </div>
  </div>
</template>
<script>
import Permissions from '@/components/account/admin/PermissionsComponent.vue'

export default {
  components: {
    Permissions,
  },
};
</script>