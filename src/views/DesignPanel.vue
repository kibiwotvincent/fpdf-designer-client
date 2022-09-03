<script setup>
import Navbar from '@/components/common/Navbar.vue'
</script>

<template>
	<Navbar />
	<section class="bg-gray-100 py-8">
		<div id="fpdf_designer_elements" class="w-ful" style="margin-top: 60px; margin-bottom: 20px; padding: 0 30px;width: 330mm;">
			<button class="btn btn-light fdpf-element" data-fpdf="cell" data-is-new-element="true">Cell</button>
			<button class="btn btn-light fdpf-element" data-fpdf="multicell" data-is-new-element="true">Muliticell</button>
			<button class="btn btn-light fdpf-element" data-fpdf="text" data-is-new-element="true">Text</button>
			<button class="btn btn-light fdpf-element" data-fpdf="write" data-is-new-element="true">Write</button>
			<button class="btn btn-light fdpf-element" data-fpdf="rect" data-is-new-element="true">Rect</button>
			<button class="btn btn-light fdpf-element" data-fpdf="link" data-is-new-element="true">Link</button>
			<button class="btn btn-light fdpf-element" data-fpdf="line" data-is-new-element="true">Line</button>
			<button class="btn btn-light fdpf-element" data-fpdf="image" data-is-new-element="true">Image</button>
			<button class="btn btn-light fdpf-element" data-fpdf="ln" data-is-new-element="true">Ln</button>
			<button class="btn btn-light fdpf-element" data-fpdf="setfillcolor" data-is-new-element="true">Fill color</button>
			<button class="btn btn-light fdpf-element" data-fpdf="setdrawcolor" data-is-new-element="true">Draw color</button>
			<button class="btn btn-light fdpf-element" data-fpdf="settextcolor" data-is-new-element="true">Text color</button>
		</div>
		<div class="panel">
			<div class="A4">
				<vue-draggable-resizable v-for="(draggable, index) in this.draggables"
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
					<i style="font-size: 11px;">{{draggable.text}}</i>
				</vue-draggable-resizable>
			</div>
		</div>
		<div class="right-panel float-right">
			<button class="btn btn-primary fdpf-element" id="send_fpdf">Preview</button>
			<button class="btn btn-danger fdpf-element" id="clear_fpdf">Clear</button>
			<button class="btn btn-warning fdpf-element" id="save_design">Save</button>
			<button class="btn btn-primary fdpf-element float-right ml-1" id="show_output">Show Output</button>
			<div class="draggable-meta">
				<div class="draggable-meta-config">
					<div class="left">
						<label>Height</label>
					</div>
					<div class="right">
						<input type="text" :value=this.activeDraggable.height />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Width</label>
					</div>
					<div class="right">
						<input type="text" :value=this.activeDraggable.width />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Top</label>
					</div>
					<div class="right">
						<input type="text" :value=this.activeDraggable.top />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Left</label>
					</div>
					<div class="right">
						<input type="text" :value=this.activeDraggable.left />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Text</label>
					</div>
					<div class="right">
						<input type="text" :value=this.activeDraggable.text />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Font Family</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Font Style</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Font Size</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Font Color</label>
					</div>
					<div class="right">
						<input type="color" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Border</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Border Size</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Border Color</label>
					</div>
					<div class="right">
						<input type="color" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Background</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Background Color</label>
					</div>
					<div class="right">
						<input type="color" />
					</div>
				</div>
				<div class="draggable-meta-config">
					<div class="left">
						<label>Text Align</label>
					</div>
					<div class="right">
						<input type="text" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import VueDraggableResizable from "vue-draggable-resizable-vue3";

	export default {
		components: {
			VueDraggableResizable
		},
		data() {
			return {
				draggables: [],
				activeDraggable: {}
			}
		},
		mounted() {
			this.initDraggables()
		},
		methods: {
			initDraggables() {
				this.draggables.push({
					height: 30,
					width: 200,
					top: 20,
					left: 20,
					text: 'Draggable Content',
				});
				
				this.draggables.push({
					height: 30,
					width: 300,
					top: 40,
					left: 20,
					text: 'Draggable Content Two',
				});
			},
			onResize: function (x) {
				console.log(x.left);
				this.activeDraggable.left = x.left
				this.activeDraggable.top = x.top
				this.activeDraggable.width = x.width
				this.activeDraggable.height = x.height
			},
			onDrag: function (x) {
				this.activeDraggable.left = x.left
				this.activeDraggable.top = x.top
			},
			onActivated (index) {
				this.activeDraggable = this.draggables[index];
			},
			onDeactivated () {
				this.active = false
			}
		},
		computed: {
			
		}
		
	};
</script>

<style scoped>
.panel {
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
button {
	color: rgb(236, 72, 153);
	border: 1px solid #d3d3d3;
	padding: 4px 10px;
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
.right-panel .draggable-meta {
	background: #f3f4f6;
	margin-top: 20px;
	padding: 10px;
}
.right-panel .draggable-meta .draggable-meta-config {
	padding: 8px 0;
	border-bottom: 1px solid #d3d3d3;
}
.right-panel .draggable-meta .draggable-meta-config .left, .right-panel .draggable-meta .draggable-meta-config .right{
	width: 50%;
	display: inline-block;
}
.right-panel .draggable-meta .draggable-meta-config label {
	margin-right: 20px;
}
.right-panel .draggable-meta .draggable-meta-config input {
	width: 100%;
	border: 1px solid #d3d3d3;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	padding: 0 4px;
}
.right-panel .draggable-meta .draggable-meta-config input:focus {
	outline: none;
}

</style>
