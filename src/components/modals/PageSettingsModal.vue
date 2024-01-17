<script setup>
import { useDocumentStore, useDocumentModalStore } from '@/stores'
const documentStore = useDocumentStore()
</script>

<template>
	<modal>
		<form @submit.prevent="onSubmit">
		<div class="">
			<div class="flex w-full gap-4 mb-3">
				<div class="w-2/6">
					<label class="block">Page Size</label>
					<select data-te-select-init v-model="settings.size" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option v-for="(size, name) in documentStore.pageSizes" :key=name :value=name>{{ name }}</option>
					</select>
				</div>
				<div class="w-2/6">
					<label class="block">Page Orientation</label>
					<select data-te-select-init v-model="settings.orientation" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option value="P">Potrait</option>
						<option value="L">Landscape</option>
					</select>
				</div>
				<div class="w-2/6">
					<label class="block">Page Margins</label>
					<select data-te-select-init v-model="settings.margins" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option v-for="(size, name) in documentStore.pageMargins" :key=name :value=name>{{ name }}</option>
					</select>
				</div>
			</div>
			<div v-show="settings.margins == 'custom'">
				<label class="block">Customize Page Margins (in millimeters)</label>
				<div class="flex w-full gap-4 mb-3">
					<div class="1/4">
						<label class="block">Top Margin </label>
						<input type="number" v-model="settings.top_margin" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "settings.margins != 'custom'"
						/>
					</div>
					<div class="1/4">
						<label class="block">Right Margin </label>
						<input type="number" v-model="settings.right_margin" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "settings.margins != 'custom'"
						/>
					</div>
					<div class="1/4">
						<label class="block">Bottom Margin </label>
						<input type="number" v-model="settings.bottom_margin" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "settings.margins != 'custom'"
						/>
					</div>
					<div class="1/4">
						<label class="block">Left Margin </label>
						<input type="number" v-model="settings.left_margin" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow" 
						:disabled = "settings.margins != 'custom'"
						/>
					</div>
				</div>
			</div>
			<div class="flex w-full gap-4 mb-3">
				<div class="w-2/6">
					<label class="block">Font Size</label>
					<input type="number" v-model="settings.font_size" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-2/6">
					<label class="block">Font Color</label>
					<input type="color" v-model="settings.font_color" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-2/6">
					<label class="block">Font Family</label>
					<select data-te-select-init v-model="settings.font_family" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
						<option v-for="(font, index) in documentStore.fonts" :key=index :value=font>{{ font }}</option>
					</select>
				</div>
			</div>
			<small class="block mb-1">Updating font size, font color and font family sets their defaults in new texts. It does not affect existing texts in the document.</small>
		</div>
		<div class="flex justify-between">
			<button type="button" @click="cancel" class="bg-gray-200 text-gray-700 rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Cancel
			</button>
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Apply
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
    import { reactive } from 'vue'
	
	export default {
		name: 'PageSettingsModalComponent',
        props: reactive({
				open: false,
		}),
		data: () => ({
				settings: {},
				defaultSettings: {},
		}),
		created() {
			/*watch for page settings changes and reset page settings*/
			const documentStore = useDocumentStore()
			this.$watch(
					() => documentStore.pageSettings,
					() => {
							this.settings = documentStore.pageSettings
						}
					)
		},
		mounted() {
			this.settings = sessionStorage.getItem('page_settings') == null ? JSON.parse(localStorage.getItem('defaults')).page : JSON.parse(sessionStorage.getItem('page_settings'))
			this.defaultSettings = { ...this.settings }
		},
		methods: {
			async onSubmit() {
				const documentStore = useDocumentStore()
				documentStore.setSpinner('loading_workspace', true)
				documentStore.saveToSession('page_settings', { ...this.settings })
				documentStore.saveToSession('draggables', documentStore.draggables)
				
				documentStore.setPageSettings(JSON.parse(sessionStorage.getItem('page_settings')))
				documentStore.updatePageMargins()
				documentStore.updatePageOrientation()
				documentStore.updateDefaultFontSettings()
				documentStore.reloadWorkspaceDraggables()
				
				this.closeModal()
			},
			cancel() {
				this.resetForm()
				this.closeModal()
			},
			resetForm() {
				this.settings = { ...this.defaultSettings }
			},
			closeModal() {
				const documentModalStore = useDocumentModalStore()
				documentModalStore.close()
			}
		}
	}
</script>