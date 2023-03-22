<template>
	<modal title="Page Settings" id="pageSettingsModal">
		<form @submit="onSubmit">
		<input type="hidden" v-model="page.type"/>
		<div class="">
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Page Size</label>
					<input type="text" v-model="page.size" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Page Orientation</label>
					<input type="text" v-model="page.orientation" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Page Margins</label>
					<input type="number" v-model="page.margins" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<label class="block">Customize Page Margins</label>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Margin Top</label>
					<input type="number" v-model="page.margin_top" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Margin Right</label>
					<input type="number" v-model="page.margin_right" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Margin Bottom</label>
					<input type="number" v-model="page.margin_bottom" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Margin Left</label>
					<input type="number" v-model="page.margin_left" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<div class="flex w-full justify-between gap-4 mb-3">
				<div>
					<label class="block">Font Size</label>
					<input type="number" v-model="page.font_size" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Weight</label>
					<input type="text" v-model="page.font_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Color</label>
					<input type="color" v-model="page.font_color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div>
					<label class="block">Font Family</label>
					<input type="text" v-model="page.font_family" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
			<label class="block">Page Color</label>
			<input type="color" v-model="page.color" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
		</div>
		<div class="flex justify-end">
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Text
			</button>
		</div>
		</form>
	</modal>
</template>

<script>
	import Modal from '@/components/form/Modal.vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'PageSettingsModalComponent',
		components: {
				Modal
			},
		data: () => ({
				page: {
					'size' : 'A4',
					'orientation' : 'P',
					'height' : '50',
					'width' : '400',
					'workspace_height' : '50',
					'workspace_width' : '400',
					'font_size' : '12',
					'font_weight' : 'normal',
					'font_color' : '#333333',
					'font_family' : 'Arial',
					'margins' : '0',
					'margin_top' : '0',
					'margin_right' : '0',
					'margin_bottom' : '0',
					'margin_left' : '0',
					'color' : '#ffffff',
				},
			}),
		methods: {
			onSubmit(e) {
				e.preventDefault()
				this.page.height = parseInt(this.page.height)
				this.page.width = parseInt(this.page.width)
				this.page.workspace_height = parseInt(this.page.workspace_height)
				this.page.workspace_width = parseInt(this.page.workspace_width)
				this.page.font_size = parseInt(this.page.font_size)
				this.page.margin_top = parseInt(this.page.margin_top)
				this.page.margin_right = parseInt(this.page.margin_right)
				this.page.margin_bottom = parseInt(this.page.margin_bottom)
				this.page.margin_left = parseInt(this.page.margin_left)
				
				const documentStore = useDocumentStore()
				documentStore.updatePageSettings(this.page)
			}
		}
	}
</script>

<style scoped>

</style>