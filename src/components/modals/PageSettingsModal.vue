<script setup>
import { useDocumentStore } from '@/stores'
const documentStore = useDocumentStore()
</script>

<template>
	<modal id="pageSettingsModal">
		<form @submit="onSubmit">
		<div class="">
			<div class="flex w-full gap-4 mb-3">
				<div class="w-2/6">
					<label class="block">Page Size</label>
					<select data-te-select-init v-model="documentStore.pageSettings.size" @change="updatePageSize" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option v-for="(size, name) in documentStore.pageSizes" :key=name :value=name>{{ name }}</option>
					</select>
				</div>
				<div class="w-2/6">
					<label class="block">Page Orientation</label>
					<select data-te-select-init v-model="documentStore.pageSettings.orientation" @change="updatePageOrientation" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option value="P">Potrait</option>
						<option value="L">Landscape</option>
					</select>
				</div>
				<div class="w-2/6">
					<label class="block">Page Margins</label>
					<select data-te-select-init v-model="documentStore.pageSettings.margins" @change="updatePageMargins" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option v-for="(size, name) in documentStore.pageMargins" :key=name :value=name>{{ name }}</option>
					</select>
				</div>
			</div>
			<div v-show="documentStore.pageSettings.margins == 'custom'">
				<label class="block">Customize Page Margins (in millimeters)</label>
				<div class="flex w-full gap-4 mb-3">
					<div class="1/4">
						<label class="block">Top Margin </label>
						<input type="number" v-model="documentStore.pageSettings.top_margin" @change="updatePageMargins" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "documentStore.pageSettings.margins != 'custom'"
						/>
					</div>
					<div class="1/4">
						<label class="block">Right Margin </label>
						<input type="number" v-model="documentStore.pageSettings.right_margin" @change="updatePageMargins" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "documentStore.pageSettings.margins != 'custom'"
						/>
					</div>
					<div class="1/4">
						<label class="block">Bottom Margin </label>
						<input type="number" v-model="documentStore.pageSettings.bottom_margin" @change="updatePageMargins" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "documentStore.pageSettings.margins != 'custom'"
						/>
					</div>
					<div class="1/4">
						<label class="block">Left Margin </label>
						<input type="number" v-model="documentStore.pageSettings.left_margin" @change="updatePageMargins" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "documentStore.pageSettings.margins != 'custom'"
						/>
					</div>
				</div>
			</div>
			<div class="flex w-full gap-4 mb-3">
				<div class="w-2/6">
					<label class="block">Font Size</label>
					<input type="number" v-model="documentStore.pageSettings.font_size" @change="updatePageFonts" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-2/6">
					<label class="block">Font Color</label>
					<input type="color" v-model="documentStore.pageSettings.font_color" @change="updatePageFonts" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-2/6">
					<label class="block">Font Family</label>
					<select data-te-select-init v-model="documentStore.pageSettings.font_family" @change="updatePageFonts" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option v-for="(font, index) in documentStore.fonts" :key=index :value=font>{{ font }}</option>
					</select>
				</div>
			</div>
			<small class="block mb-1">Updating font size, font color and font family sets their defaults in new texts. It does not affect existing texts in the document.</small>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	
	export default {
		name: 'PageSettingsModalComponent',
		methods: {
			updatePageMargins() {
				const documentStore = useDocumentStore()
				documentStore.updatePageMargins()
				this.$emit('updated')
			},
			updatePageOrientation() {
				const documentStore = useDocumentStore()
				documentStore.updatePageOrientation()
				this.$emit('updated')
			},
			updatePageSize() {
				const documentStore = useDocumentStore()
				documentStore.updatePageSize()
				this.$emit('updated')
			},
			updatePageFonts() {
				const documentStore = useDocumentStore()
				documentStore.updatePageFonts()
			},
		}
	}
</script>

<style scoped>

</style>