<script setup>
import AddSubscription from '@/components/account/admin/AddSubscriptionComponent.vue'
</script>

<template>
  <div class="flex flex-wrap">
    <div class="w-full">
        <div class="flex justify-between mb-4">
            <div class="inline-block pt-4 text-gray-700 text-sm font-semibold uppercase">
                Add Subscription
            </div>
        </div>
        <div class="relative w-full bg-white mt-8 p-4 rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <AddSubscription />
        </div>
    </div>
  </div>
</template>
