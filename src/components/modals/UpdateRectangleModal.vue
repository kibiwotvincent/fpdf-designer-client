<script setup>
import { useDocumentStore } from '@/stores'
const documentStore = useDocumentStore()
</script>

<template>
	<modal id="updateRectangleModal">
		<div class="flex justify-between">
			<button @click="duplicateDraggable" class="bg-gray-200 text-gray-700 rounded py-1 px-3 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			<DocumentDuplicateIcon class="inline-block h-4 w-4 mb-1"/> 
			Duplicate
			</button>
			
			<button @click="deleteDraggable" class="bg-red-400 text-white rounded py-1 px-3 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			<TrashIcon class="inline-block h-4 w-4 mb-1"/> 
			Delete
			</button>
			<button type="button" data-te-modal-dismiss ref="closeModal" class="hidden">Close</button>
		</div>
		<div class="mt-4">
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
			
			<div class="flex w-full gap-4 mb-3">
				<div class="w-1/4">
					<label class="block">Background Color</label>
					<input type="color" v-model="documentStore.activeDraggable.background_color" @change="removeTransparency" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 mb-3 text-neutral-700 outline-none focus:shadow" />
				</div>
				<div class="w-1/4 pt-1">
					<label class="block">&nbsp;</label>
					<input
						class="relative float-left mt-1 mr-1 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-red-400 dark:checked:border-red-400 checked:bg-red-400 dark:checked:bg-red-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
						type="checkbox"
						id="transparentBackgroundCheckbox"
						value="none" 
						:checked="documentStore.activeDraggable.background == 'none'"
						@click="toggleBackground"
						/>
					<label class="inline-block mt-[0.125rem] hover:cursor-pointer" for="transparentBackgroundCheckbox">Transparent</label>
				</div>
				<div class="w-1/4">
					<label class="block">Border Color</label>
					<input type="color" v-model="documentStore.activeDraggable.border_color" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Border Weight (mm)</label>
					<input type="text" v-model="documentStore.activeDraggable.border_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
	import Modal from '@/components/form/HeadlessModal.vue'
	import { TrashIcon } from '@heroicons/vue/20/solid'
	import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'
	
	export default {
		name: 'UpdateRectangleModalComponent',
		components: {
			Modal
		},
		methods: {
			deleteDraggable() {
				const documentStore = useDocumentStore()
				const draggableIndex = documentStore.activeDraggable.index
				documentStore.deleteDraggable(draggableIndex)
				//close modal
				this.$refs.closeModal.click()
			},
			duplicateDraggable() {
				const documentStore = useDocumentStore()
				documentStore.addDraggable({ ...documentStore.activeDraggable })
				//close modal
				this.$refs.closeModal.click()
			},
			toggleBackground() {
				const documentStore = useDocumentStore()
				const background = documentStore.activeDraggable.background == 'none' ? documentStore.activeDraggable.background_color : 'none'
				documentStore.updateDraggable(documentStore.activeDraggable.index, 'background', background)
				if(background == 'none') {
					documentStore.updateDraggable(documentStore.activeDraggable.index, 'background_color', JSON.parse(localStorage.getItem('defaults')).rectangle.background_color)
				}
			},
			removeTransparency() {
				const documentStore = useDocumentStore()
				documentStore.updateDraggable(documentStore.activeDraggable.index, 'background', documentStore.activeDraggable.background_color)
			},
		}
	}
</script>