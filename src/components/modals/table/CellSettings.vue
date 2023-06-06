<template>
	<div>
		<div class="flex w-full gap-4 mb-3">
			<div class="w-1/2">
				<label class="block">Text Align</label>
				<select data-te-select-init v-model="cell.text_align" @change="updateCell" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow">
					<option value="left">Left</option>
					<option value="center">Center</option>
					<option value="right">Right</option>
				</select>
			</div>
			<div class="w-1/2">
				<label class="block">Font Size</label>
				<input type="number" v-model="cell.font_size" @input="updateCell" class="block w-full rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
			</div>
		</div>
		<div class="flex w-full gap-4 mb-3">
			<div class="w-1/2">
				<label class="block">Font Color</label>
				<input type="color" v-model="cell.font_color" @input="updateCell" class="block w-full h-[2.15rem] rounded border border-solid border-neutral-300 px-3 py-1 text-neutral-700 outline-none focus:shadow"/>
			</div>
			<div class="w-1/2">
				<label class="block">Font Style</label>
				<div class="inline-block mr-6">
					<input
						class="relative float-left mt-1 mr-1 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-red-400 dark:checked:border-red-400 checked:bg-red-400 dark:checked:bg-red-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
						type="checkbox"
						:id="mode+'ColumnBoldCheckbox'"
						value="bold" 
						:checked="checkFontStyle('bold')"
						v-model="cell.font_style"
						@change="updateCell"
						/>
					<label class="inline-block mt-[0.125rem] hover:cursor-pointer" :for="mode+'ColumnBoldCheckbox'">Bold</label>
				</div>
				<div class="inline-block mr-6">
					<input
						class="relative float-left mt-1 mr-1 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-red-400 dark:checked:border-red-400 checked:bg-red-400 dark:checked:bg-red-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
						type="checkbox"
						:id="mode+'ColumnItalicCheckbox'"
						value="italic" 
						:checked="checkFontStyle('italic')"
						v-model="cell.font_style"
						@change="updateCell"
						/>
					<label class="inline-block mt-[0.125rem] hover:cursor-pointer" :for="mode+'ColumnItalicCheckbox'">Italic</label>
				</div>
				<div class="inline-block mr-6">
					<input
						class="relative float-left mt-1 mr-1 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-red-400 dark:checked:border-red-400 checked:bg-red-400 dark:checked:bg-red-400 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
						type="checkbox"
						:id="mode+'ColumnUnderlineCheckbox'"
						value="underline" 
						:checked="checkFontStyle('underline')"
						v-model="cell.font_style"
						@change="updateCell"
						/>
					<label class="inline-block mt-[0.125rem] hover:cursor-pointer" :for="mode+'ColumnUnderlineCheckbox'">Underline</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { reactive } from 'vue'
	import { useDocumentStore } from '@/stores'
	
	export default {
		name: 'CellSettingsComponent',
		props: reactive({
					draggable: '',
					row: '',
					column: '',
				}),
		data: () => ({
				cell: {},
				mode: "update"
		}),
		watch: {
			//watch for draggable/row/column changes and update cell values
			draggable() {
				this.setCell()
			},
			row() {
				this.setCell()
			},
			column() {
				this.setCell()
			}
		},
		mounted() {
			//this.cell = {}
		},
		methods: {
			setCellDefaults() {
				/**
				* set text_align, font_size, font_color and font_style
				* for the cells that don't have it set yet
				**/
				const documentStore = useDocumentStore()
				let settings = this.row == 0 ? documentStore.draggables[this.draggable].column_settings : documentStore.draggables[this.draggable].row_settings
				let cell = documentStore.draggables[this.draggable]['cells'][this.row][this.column]
				
				if(typeof cell.text_align == 'undefined') {
					cell.text_align = settings.text_align
				}
				if(typeof cell.font_size == 'undefined') {
					cell.font_size = settings.font_size
				}
				if(typeof cell.font_color == 'undefined') {
					cell.font_color = settings.font_color
				}
				if(typeof cell.font_style == 'undefined') {
					cell.font_style = settings.font_style
				}
			},
			setCell() {
				this.setCellDefaults()
				const documentStore = useDocumentStore()
				let cell = documentStore.draggables[this.draggable]['cells'][this.row][this.column]
				this.cell = cell
			},
			checkFontStyle(style) {
				if(typeof this.cell.font_style == 'undefined') {
					return false
				}
				
				return (this.cell.font_style.includes(style))
			},
			updateCell() {
				const documentStore = useDocumentStore()
				let draggable = documentStore.draggables[this.draggable]
				let cells = draggable.cells
				cells[this.row][this.column] = this.cell
				documentStore.updateDraggable(this.draggable, 'cells', cells)
			}
		}
	}
</script>