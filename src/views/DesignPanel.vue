<script setup>
import Navbar from '@/components/common/Navbar.vue'
//import { MutationType } from 'pinia'
import { useDocumentStore } from '@/stores'

const documentStore = useDocumentStore()

</script>

<template>
	<Navbar />
	
	<section class="bg-gray-100 py-8">
		<div id="fpdf_designer_elements" class="w-ful" style="margin-top: 60px; margin-bottom: 20px; padding: 0 30px;width: 336mm;">
			<button class="mr-4 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
			data-te-toggle="modal"
			data-te-target="#pageSettingsModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Page Settings
			</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="text" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addTextModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			ref="textModalButton"
			>
			Add Text
			</button>
			<button data-te-toggle="modal" data-te-target="#updateTextModal" ref="updateModalButton-text" class="hidden">Update</button>
			
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="rect" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addTableModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Table
			</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="link" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addLinkModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Link
			</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="line" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addLineModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Line
			</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="image" data-is-new-element="true"
			data-te-toggle="modal"
			data-te-target="#addImageModal"
			data-te-ripple-init
			data-te-ripple-color="light"
			>
			Add Image
			</button>
			
			<div class="float-right">
				<button class="text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Reset</button>
				<button class="ml-2 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Preview</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Save</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Download</button>
			</div>
		</div>
		<div class="panel">
			<div class="page">
				<div class="workspace">
					<vue-draggable-resizable v-for="(draggable, index) in documentStore.draggables"
					:key=index
					:parent=true 
					:x=draggable.left 
					:y=draggable.top 
					:w=draggable.width 
					:h=draggable.height
					@activated="onActivated(index)" 
					@deactivated="onDeactivated"
					@resizing="onResize"
					@dragging="onDrag"
					:active= draggable.active
					:resizable= draggable.resizable
					@click.right.prevent="showUpdateDraggable(index)"
					>
					<div v-if="draggable.type != 'image'" :class="'flex flex-row items-center justify-'+(draggable.text_align == 'right' ? 'end' : draggable.text_align)"
					:style="
							'height: '+(draggable.height - 2)+'px;'+ 
							'border-bottom: '+draggable.border_weight+'px '+draggable.border_color+' solid;'+ 
							'background-color: '+draggable.background_color
						">
						<span 
						:style="
							'color: '+draggable.font_color+';'+ 
							'font-weight: '+draggable.font_weight+';'+ 
							'font-size: '+draggable.font_size+'pt;'+ 
							'padding-top: '+draggable.padding_top+'px;'+ 
							'padding-right: '+draggable.padding_right+'px;'+ 
							'padding-bottom: '+draggable.padding_bottom+'px;'+ 
							'padding-left: '+draggable.padding_left+'px;' 
						">
						{{ draggable.text }}</span>
					</div>
					<span v-if="draggable.type == 'image'">
						<img :src="draggable.url" class="w-full h-full" />
					</span>
					</vue-draggable-resizable>
				</div>
			</div>
		</div>
	</section>
	<!--modals-->
	<page-settings-modal />
	<add-table-modal />
	<add-text-modal />
	<update-text-modal />
	<add-link-modal />
	<add-line-modal />
	<add-image-modal />
	<!--end modals-->
</template>

<script>
	import VueDraggableResizable from "vue-draggable-resizable-vue3"
	import AddTableModal from '@/components/modals/AddTableModal.vue'
	import AddTextModal from '@/components/modals/AddTextModal.vue'
	import UpdateTextModal from '@/components/modals/UpdateTextModal.vue'
	import AddLinkModal from '@/components/modals/AddLinkModal.vue'
	import AddLineModal from '@/components/modals/AddLineModal.vue'
	import AddImageModal from '@/components/modals/AddImageModal.vue'
	import PageSettingsModal from '@/components/modals/PageSettingsModal.vue'
	
	export default {
		components: {
			VueDraggableResizable,
			AddTableModal,
			AddTextModal,
			AddLineModal,
		},
		data() {
			return {
				currentTop: 0,
				updateText: false
			}
		},
		mounted() {
			this.initDraggables()
		},
		methods: {
			initDraggables() {
				const documentStore = useDocumentStore()
				let templateID = this.$route.params.template_id
				if(templateID !== "") {
					//initialize design panel with the selected template
					documentStore.init(templateID)
				}
			},
			onResize: function (x) {
				const documentStore = useDocumentStore()
				documentStore.resizeDraggable(x)
			},
			onDrag: function (x) {
				const documentStore = useDocumentStore()
				documentStore.dragDraggable(x)
				
				///calculate how much top position has changed
				//let adjustTopBy = this.activeDraggable.top - this.currentTop;
				
				/*
				//adjust the top positions of the other draggables
				for(let i = 0; i < this.document.draggables.length; i++) {
					let newTop = this.document.draggables[i].current_top + adjustTopBy
					
					//only move draggables that are below the active draggable
					if(this.document.draggables[i].current_top > this.activeDraggable.current_top) {
					console.log(newTop)
					//this.document.draggables[i].top = newTop;
					}
				}*/
			},
			onActivated (index) {
				const documentStore = useDocumentStore()
				documentStore.setActiveDraggable(documentStore.draggables[index])
				
				/*
				//save the initial top position of the selected draggable
				this.currentTop = this.activeDraggable.top;
				
				for(let i = 0; i < this.document.draggables.length; i++) {
					//save curent top position of the draggable
					//to be used to move other draggables when dragging
					this.document.draggables[i].current_top = this.document.draggables[i].top
				}*/
			},
			onDeactivated () {
				this.active = false
			},
			showUpdateDraggable(index) {
				const documentStore = useDocumentStore()
				documentStore.setActiveDraggable(documentStore.draggables[index])
				documentStore.activateDraggable(index)
				//launch update modal
				const modal = 'updateModalButton-'+documentStore.activeDraggable.type
				this.$refs[modal].click()
			}
		}
	};
</script>

<style scoped>
.panel {
	width: 336mm;
}
.page {
	display: inline-block;
	width: 210mm;
	height: 297mm;
	background: #fff;
	margin-left: 63mm;
	color: #000;
}
.workspace {
	width: 190mm; /*convert everything to px*/
	height: 277mm;
	margin: 10mm;
	border: 1px pink dotted;
	background: #fff;
}
#fpdf_designer_elements button {
	border: 1px solid #d3d3d3;
	padding: 4px 15.65px;
}
</style>
