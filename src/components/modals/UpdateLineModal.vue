<script setup>
import { useDocumentStore } from '@/stores'
const documentStore = useDocumentStore()
</script>

<template>
	<modal id="updateLineModal">
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
			<div class="w-full mb-3">
				<label class="block">Line Color</label>
				<input type="color" v-model="documentStore.activeDraggable.line_color" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
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
					<label class="block">Width</label>
					<input type="number" v-model="documentStore.activeDraggable.width" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
				</div>
				<div class="w-1/4">
					<label class="block">Line Weight (mm)</label>
					<input type="text" v-model="documentStore.activeDraggable.line_weight" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
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
		name: 'UpdateLineModalComponent',
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
		}
	}
</script>