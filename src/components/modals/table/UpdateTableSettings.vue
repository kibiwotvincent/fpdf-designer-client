<script setup>
import { useDocumentStore } from '@/stores'
const documentStore = useDocumentStore()
</script>

<template>
		<div>
			<div class="flex w-full gap-4 mb-3">
				<div class="w-1/2">
					<label class="block">Number of Columns</label>
					<div>
						<button type="button" @click="$emit('decrease', 'columns')" class="inline h-[2.125rem] px-3 bg-gray-200 rounded-tl rounded-bl text-gray-700 outline-none focus:shadow">-</button>
						<input type="number" v-model="documentStore.activeDraggable.columns" readonly class="inline w-[82.5%] text-center border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
						<button type="button" @click="$emit('increase', 'columns')" class="inline h-[2.125rem] px-3 bg-gray-200 rounded-tr rounded-br text-gray-700 outline-none focus:shadow">+</button>
					</div>
				</div>
				<div class="w-1/2">
					<label class="block">Number of Rows</label>
					<div>
						<button type="button" @click="$emit('decrease', 'rows')" class="inline h-[2.125rem] px-3 bg-gray-200 rounded-tl rounded-bl text-gray-700 outline-none focus:shadow">-</button>
						<input type="number" v-model="documentStore.activeDraggable.rows" readonly class="inline w-[82.5%] text-center border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
						<button type="button" @click="$emit('increase', 'rows')" class="inline h-[2.125rem] px-3 bg-gray-200 rounded-tr rounded-br text-gray-700 outline-none focus:shadow">+</button>
					</div>
				</div>
			</div>
			<div class="flex w-full gap-4 mb-3">
				<div class="w-1/4">
					<label class="block">Left</label>
					<input type="number" v-model="documentStore.activeDraggable.left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Top</label>
					<input type="number" v-model="documentStore.activeDraggable.top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Height</label>
					<input type="number" v-model="documentStore.activeDraggable.height" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Width</label>
					<input type="number" v-model="documentStore.activeDraggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
		</div>
</template>

<script>
	export default {
		name: 'UpdateTableSettingsComponent',
	}
</script>