<template>
	<modal title="Add Table" id="addTableModal">
		<div class="flex justify-between">
			<div>
				<label>Number of Rows</label>
				<div class="relative mb-4 flex w-full flex-wrap items-stretch">
					<button
					class="relative z-[2] flex items-center rounded-l bg-gray-300 p-2 text-xs font-medium uppercase leading-tight text-red-400 shadow-md transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-lg focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg"
					type="button"
					id="rows-minus"
					data-te-ripple-init
					data-te-ripple-color="light">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
					</svg>
					</button>
					<input
					type="text"
					class="relative block w-2/6 border border-solid border-neutral-300 bg-transparent bg-clip-padding pl-[13.5%] py-1 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-gray-300 focus:text-neutral-700 focus:shadow-te-gray-300 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
					value="2"
					readonly="" />
					<button
					class="relative z-[2] flex items-center rounded-r bg-gray-300 p-2 text-xs font-medium uppercase leading-tight text-red-400 shadow-md transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-lg focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg"
					type="button"
					id="rows-plus"
					data-te-ripple-init
					data-te-ripple-color="light">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
					</svg>
					</button>
				</div>
			</div>
			<div>
				<label class="flex w-full justify-end">Number of Columns</label>
				<div class="relative mb-4 flex w-full flex-wrap items-stretch justify-end">
					<button
					class="relative z-[2] flex items-center rounded-l bg-gray-300 p-2 text-xs font-medium uppercase leading-tight text-red-400 shadow-md transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-lg focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg"
					type="button"
					id="columns-minus"
					data-te-ripple-init
					data-te-ripple-color="light">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
					</svg>
					</button>
					<input
					type="text"
					class="relative block w-2/6 border border-solid border-neutral-300 bg-transparent bg-clip-padding pl-[13.5%] py-1 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-gray-300 focus:text-neutral-700 focus:shadow-te-gray-300 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
					value="2"
					readonly="" />
					<button
					class="relative z-[2] flex items-center rounded-r bg-gray-300 p-2 text-xs font-medium uppercase leading-tight text-red-400 shadow-md transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-lg focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg"
					type="button"
					id="columns-plus"
					data-te-ripple-init
					data-te-ripple-color="light">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
					</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col overflow-x-auto mb-4">
			<div class="sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div class="overflow-x-auto">
						<table class="min-w-full text-left text-sm font-light">
							<thead class="border-b font-medium dark:border-neutral-500">
								<tr>
									<th scope="col" class="px-6 py-4">#</th>
									<th scope="col" class="px-6 py-4">Heading2</th>
									<th scope="col" class="px-6 py-4">Heading</th>
									<th scope="col" class="px-6 py-4">Heading</th>
									<th scope="col" class="px-6 py-4">Heading</th>
									<th scope="col" class="px-6 py-4">Heading</th>
									<th scope="col" class="px-6 py-4">Heading</th>
									<th scope="col" class="px-6 py-4">Heading</th>
									<th scope="col" class="px-6 py-4">Heading</th>
								</tr>
							</thead>
							<tbody>
								<tr class="border-b dark:border-neutral-500">
									<td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
									<td class="whitespace-nowrap px-6 py-4">Cell</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-end">
			<button class="bg-red-400 text-white rounded mt-4 py-2 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			Add Table
			</button>
		</div>
	</modal>
</template>

<script>
import Modal from '@/components/form/Modal.vue'
export default {
  name: 'AddTableModalComponent',
  components: {
			Modal
		},
  props: {
			size: {default: 5, type: Number},
			color: {default: "blue-600", type: String},
			text: {default: "Loading...", type: String},
			showText: {default: false, type: Boolean}
		}
}
</script>

<style scoped>

</style>