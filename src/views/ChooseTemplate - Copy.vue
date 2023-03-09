<script setup>
import Navbar from '@/components/common/Navbar.vue'
</script>

<template>
	<Navbar />
	<h1 class="w-full my-2 text-4xl sm:text-5xl font-bold leading-tight text-center text-gray-800">
          These are the templates you can use to create your documents
        </h1>
	<section class="bg-gray-100" style="margin-top: 60px"></section>
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
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="setfillcolor" data-is-new-element="true">Fill Color</button>
			<button class="bg-white text-gray-600 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" data-fpdf="setdrawcolor" data-is-new-element="true">Draw Color</button>
			
			<div class="float-right">
				<button class="text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Clear</button>
				<button class="ml-2 text-gray-600 rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Preview</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Save</button>
				<button class="ml-2 secondary rounded shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Download</button>
			</div>
		</div>
		<div class="flex justify-center">
  <div
    class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
    <a href="#!" data-te-ripple-init data-te-ripple-color="light">
      <img
        class="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
        alt="" />
    </a>
    <div class="p-6">
      <h5
        class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Card title
      </h5>
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </p>
      <button
        type="button"
        class="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        data-te-ripple-init
        data-te-ripple-color="light">
        Button
      </button>
    </div>
  </div>
</div>

<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>

<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
</span>

<svg class="animate-bounce w-6 h-6 ...">
  <!-- ... -->
</svg>

<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing...
</button>

<div class="flex justify-center">
  <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
    <input
      class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
      type="checkbox"
      id="inlineCheckbox1"
      value="option1" />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="inlineCheckbox1"
      >1</label
    >
  </div>
  <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
    <input
      class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
      type="checkbox"
      id="inlineCheckbox2"
      value="option2" />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="inlineCheckbox2"
      >2</label
    >
  </div>
  <div class="mb-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]">
    <input
      class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:pointer-events-none hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent disabled:opacity-60"
      type="checkbox"
      id="inlineCheckbox3"
      value="option3"
      disabled />
    <label
      class="inline-block pl-[0.15rem] opacity-50 hover:pointer-events-none"
      for="inlineCheckbox3"
      >3 (disabled)</label
    >
  </div>
</div>

<div class="flex justify-center">
  <div>
    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
      <input
        class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
        type="checkbox"
        value=""
        id="checkboxDefault" />
      <label
        class="inline-block pl-[0.15rem] hover:cursor-pointer"
        for="checkboxDefault">
        Default checkbox
      </label>
    </div>
    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
      <input
        class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
        type="checkbox"
        value=""
        id="checkboxChecked"
        checked />
      <label
        class="inline-block pl-[0.15rem] hover:cursor-pointer"
        for="checkboxChecked">
        Checked checkbox
      </label>
    </div>
  </div>
</div>

	</section>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				templates: [],
			}
		},
		mounted() {
			
		},
		methods: {
			
		},
		computed: {
			
		}
		
	};
</script>

<style scoped>
button {
	border: 1px solid #d3d3d3;
	padding: 4px 15.65px;
}
</style>
