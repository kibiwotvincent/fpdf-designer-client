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
			<div class="A4 parent">
				<vue-draggable-resizable :parent=true :w=700 :h=30>
					<p>You can drag me around and resize me as you wish.</p>
				</vue-draggable-resizable>
			</div>
		</div>
		<div class="right-panel float-right">
			<button class="btn btn-primary fdpf-element" id="send_fpdf">Preview</button>
			<button class="btn btn-danger fdpf-element" id="clear_fpdf">Clear</button>
			<button class="btn btn-warning fdpf-element" id="save_design">Save</button>
			<button class="btn btn-primary fdpf-element float-right ml-1" id="show_output">Show Output</button>
			<h1>dfd</h1>
		</div>
	</section>
</template>

<script>
	import VueDraggableResizable from "vue-draggable-resizable-vue3";

	export default {
		components: {
			VueDraggableResizable
		},
		data: function () {
			return {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			}
		},
		methods: {
			onResize: function (x, y, width, height) {
				this.x = x
				this.y = y
				this.width = width
				this.height = height
			},
			onDrag: function (x, y) {
				this.x = x
				this.y = y
			}
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
.parent {
  
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
}
</style>
