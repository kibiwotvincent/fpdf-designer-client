<script setup>
import Navbar from '@/components/common/Navbar.vue'
</script>

<template>
	<Navbar />
	<section class="bg-gray-100 py-8">
		<div id="fpdf_designer_elements" class="w-ful" style="margin-top: 60px; margin-bottom: 20px; padding: 0 30px;width: 336mm;">
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="cell" data-is-new-element="true">Cell</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="multicell" data-is-new-element="true">MulitiCell</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="text" data-is-new-element="true">Text</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="write" data-is-new-element="true">Write</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="rect" data-is-new-element="true">Rect</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="link" data-is-new-element="true">Link</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="line" data-is-new-element="true">Line</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="image" data-is-new-element="true">Image</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="ln" data-is-new-element="true">Ln</button>
			
			<div class="float-right">
				<button class="text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Clear</button>
				<button class="ml-2 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Preview</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Save</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Download</button>
			</div>
		</div>
		<div class="panel">
		<div class="left-panel">
			<div class="A4">
				<vue-draggable-resizable v-for="(draggable, index) in draggables"
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
				>
				<div class="flex flex-row items-center justify-end " :style="'height: '+(draggable.height - 2)+'px; font-weight: '+draggable.font_weight+'; background-color: '+draggable.background_color">
				<span class="mr-2">{{ draggable.text }}</span>
				</div>
				</vue-draggable-resizable>
			</div>
		</div>
		<div class="right-panel float-right">
			<TabGroup>
				<TabList class="flex">
					<Tab v-slot="{ selected }" as="template" class="flex-auto text-center">
						<button :class="[selected ? 'outline-none secondary text-white-800' : 'text-pink-500']">
							Element Settings
						</button>
					</Tab>
					<Tab v-slot="{ selected }" as="template" class="flex-auto text-center">
						<button :class="[selected ? 'outline-none secondary text-white-800' : 'text-pink-500']">
							Page Settings
						</button>
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<div class="draggable-meta">
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Height</label>
								</div>
								<div class="right">
									<input type="text" :value=activeDraggable.height />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Width</label>
								</div>
								<div class="right">
									<input type="text" :value=activeDraggable.width />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Top</label>
								</div>
								<div class="right">
									<input type="text" :value=activeDraggable.top />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Left</label>
								</div>
								<div class="right">
									<input type="text" :value=activeDraggable.left />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Text</label>
								</div>
								<div class="right">
									<input type="text" :value=activeDraggable.text />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Family</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Style</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Size</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Color</label>
								</div>
								<div class="right">
									<input type="color" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Border</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Border Size</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Border Color</label>
								</div>
								<div class="right">
									<input type="color" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Background</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Background Color</label>
								</div>
								<div class="right">
									<input type="color" />
								</div>
							</div>
							<div class="draggable-meta-config">
								<div class="left">
									<label class="text-gray-600">Text Align</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<div class="page-meta">
							<div class="page-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Family</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="page-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Style</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="page-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Size</label>
								</div>
								<div class="right">
									<input type="text" />
								</div>
							</div>
							<div class="page-meta-config">
								<div class="left">
									<label class="text-gray-600">Font Color</label>
								</div>
								<div class="right">
									<input type="color" />
								</div>
							</div>
							<div class="page-meta-config">
								<div class="left">
									<label class="text-gray-600">Background Color</label>
								</div>
								<div class="right">
									<input type="color" />
								</div>
							</div>
							<div class="page-meta-config">
								<div class="left">
									<label class="text-gray-600">Background Image</label>
								</div>
								<div class="right">
									<input type="color" />
								</div>
							</div>
						</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	import VueDraggableResizable from "vue-draggable-resizable-vue3";
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

	export default {
		components: {
			VueDraggableResizable
		},
		data() {
			return {
				draggables: [],
				activeDraggable: {},
				onePxToMM: 50/196,
				oneMMToPx: 196/50,
				currentTop: 0,
			}
		},
		mounted() {
			this.initDraggables()
		},
		methods: {
			initDraggables() {
				let templateID = this.$route.params.template_id
				
				axios
				.get('http://localhost:8000/api/templates/'+templateID)
				.then((response) => {
					this.draggables = response.data.draggables
				})
			},
			onResize: function (x) {
				this.activeDraggable.left = x.left
				this.activeDraggable.top = x.top
				this.activeDraggable.width = x.width
				this.activeDraggable.height = x.height
			},
			onDrag: function (x) {
				this.activeDraggable.left = x.left
				this.activeDraggable.top = x.top
				
				//calculate how much top position has changed
				let adjustTopBy = this.activeDraggable.top - this.currentTop;
				
				//adjust the top positions of the other draggables
				for(let i = 0; i < this.draggables.length; i++) {
					let newTop = this.draggables[i].current_top + adjustTopBy
					
					//only move draggables that are below the active draggable
					if(this.draggables[i].current_top > this.activeDraggable.current_top) {
					console.log(newTop)
					//this.draggables[i].top = newTop;
					}
				}
			},
			onActivated (index) {
				this.activeDraggable = this.draggables[index];
				//save the initial top position of the selected draggable
				this.currentTop = this.activeDraggable.top;
				
				for(let i = 0; i < this.draggables.length; i++) {
					//save curent top position of the draggable
					//to be used to move other draggables when dragging
					this.draggables[i].current_top = this.draggables[i].top
				}
			},
			onDeactivated () {
				this.active = false
			},
		},
		computed: {
			
		}
		
	};
</script>

<style scoped>
.panel {
	width: 336mm;
}
.left-panel {
	width: 220mm;
	display: inline-block;
}
.A4 {
	width: 210mm;
	height: 297mm;
	margin-left: 30px;
	margin-bottom: 20px;
	border: 1px #d3d3d3 solid;
	background: #fff;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	color: #000;
}
.A4 img {
	position: absolute;
	width: 210mm;
	height: 297mm;
}
button {
	border: 1px solid #d3d3d3;
	padding: 4px 15.65px;
}
.right-panel {
	padding: 10px; 
	margin-right: 30px; 
	width: 400px;
	background: #fff;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	color: #000;
	border-radius: 4px;
}

.right-panel button.secondary{ 
	color: #fff;
}
.right-panel .draggable-meta, .right-panel .page-meta {
	background: #f3f4f6;
	margin-top: 0px;
	padding: 10px;
	border-left:1px solid #d3d3d3;
	border-right:1px solid #d3d3d3;
	border-bottom:1px solid #d3d3d3;
}
.right-panel .draggable-meta .draggable-meta-config, .right-panel .page-meta .page-meta-config {
	padding: 8px 0;
	border-bottom: 1px solid #d3d3d3;
}
.right-panel .draggable-meta .draggable-meta-config .left, .right-panel .draggable-meta .draggable-meta-config .right, .right-panel .page-meta .page-meta-config .left, .right-panel .page-meta .page-meta-config .right {
	width: 50%;
	display: inline-block;
}
.right-panel .draggable-meta .draggable-meta-config label, .right-panel .page-meta .page-meta-config label {
	margin-right: 20px;
}
.right-panel .draggable-meta .draggable-meta-config input, .right-panel .page-meta .page-meta-config input {
	width: 100%;
	border: 1px solid #d3d3d3;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	padding: 0 4px;
}
.right-panel .draggable-meta .draggable-meta-config input:focus, .right-panel .page-meta .page-meta-config input:focus {
	outline: none;
}

</style>
