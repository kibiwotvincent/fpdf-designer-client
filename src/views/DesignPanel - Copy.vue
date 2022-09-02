<script setup>
import Navbar from '@/components/common/Navbar.vue'
</script>

<template>
	<Navbar />
	<section class="bg-gray-100 py-8">
		<div id="fpdf_designer_elements" class="w-ful" style="margin-top: 60px; margin-bottom: 20px; padding: 0 30px;width: 330mm;">
			<button class="btn btn-primary fdpf-element" id="send_fpdf">Preview</button>
			<button class="btn btn-danger fdpf-element" id="clear_fpdf">Clear</button>
			<button class="btn btn-warning fdpf-element" id="save_design">Save</button>
			<button class="btn btn-warning fdpf-element" id="load_design">Load</button>
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
			<button class="btn btn-primary fdpf-element float-right ml-1" id="show_output">Show Output</button>
		</div>
		<div class="panel" ref="panelRef">
			<Vue3DraggableResizable
				:initW="600"
				:initH="30"
				:parent=true 
				v-model:x="x"
				v-model:y="y"
				v-model:w="w"
				v-model:h="h"
				v-model:active="active"
				:draggable="true"
				:resizable="true"
				@activated="print('activated')"
				@deactivated="print('deactivated')"
				@drag-start="print('drag-start')"
				@resize-start="print('resize-start')"
				@dragging="logPosition()"
				@resizing="print('resizing')"
				@drag-end="print('drag-end')"
				@resize-end="print('resize-end')"
				>
				##
			</Vue3DraggableResizable>
		</div>
	</section>
</template>

<script>
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
//import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
export default defineComponent({
  name: 'DesignPanel',
  components: { Vue3DraggableResizable },
  data() {
    return {
      x: 40,
      y: 156,
      h: 100,
      w: 100,
      active: false
    }
  },
  methods: {
    print(val) {
      console.log(val)
    },
	logPosition() {
		const panelPosition = this.$refs["panelRef"].getBoundingClientRect();
		console.log("Panel position"+panelPosition.left+" - "+panelPosition.top);
		console.log("Item position"+this.x+" - "+this.y);
	}
  }
})
</script>

<style scoped>
.panel {
	width: 210mm;
	height: 297mm;
	//margin: 0 auto;
	margin-left: 30px;
	margin-bottom: 20px;
	border: 1px #D3D3D3 solid;
	background: #fff;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	color: #000;
}
button {
	color: rgb(236, 72, 153);
	border: 1px solid #d3d3d3;
	padding: 4px 10px;
}
.btn-lightt {
	color: #fff;
}
</style>
