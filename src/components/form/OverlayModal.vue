<template>
<div
  data-te-modal-init
  class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="overlayModal"
  data-te-backdrop="static"
  data-te-keyboard="false"
  tabindex="-1"
  aria-labelledby="overlayModalLabel"
  aria-hidden="true">
  <div
    data-te-modal-dialog-ref
    class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
    <div
      class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      
		<div data-te-modal-body-ref class="relative p-4">
		<Spinner :text=this.text :show-text=true />
		</div>
		<button type="button" data-te-modal-dismiss ref="closeModalButton" class="hidden">
			Close
		</button>
    </div>
  </div>
</div>
</template>

<script>
	import { reactive } from 'vue'
	import Spinner from '@/components/form/Spinner'
	
	export default {
		name: 'ModalComponent',
		components: {
			Spinner
		},
		props: reactive({
				text: null,
				dismiss: false,
			}),
		watch: {
			dismiss() {
				if(this.dismiss) {
					this.$refs.closeModalButton.click()
				}
			}
		}
	}
</script>