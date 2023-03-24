<template>
	<div
	data-te-modal-init
	class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
	:id="this.id"
	tabindex="-1"
	:aria-labelledby="this.id+'Label'"
	aria-modal="true"
	role="dialog">
		
		<div
		data-te-modal-dialog-ref
		class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
			<div
			class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
				<div class="relative p-4 text-gray-600">
					<!--modal body-->
					<slot></slot>
					<!--end modal body-->
				</div>
			</div>
		</div>	
		
    </div>
</template>

<script>
	import { reactive } from 'vue'
	
	export default {
		name: 'HeadlessModalComponent',
		props: reactive({
				id: null
		})
	}
</script>

<style scoped>

</style>