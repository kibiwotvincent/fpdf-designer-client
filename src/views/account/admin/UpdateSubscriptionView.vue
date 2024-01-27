<script setup>
import UpdateSubscription from '@/components/account/admin/UpdateSubscriptionComponent.vue'
</script>

<template>
  <div class="flex flex-wrap">
    <div class="w-full pt-4">
        <div class="flex justify-between">
            <div class="inline-block text-gray-700 text-sm font-semibold uppercase">
                Update Subscription
            </div>
        </div>
        <div class="relative w-full bg-white mt-4 p-4 rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <UpdateSubscription :id=$route.params.id />
        </div>
    </div>
  </div>
</template>
