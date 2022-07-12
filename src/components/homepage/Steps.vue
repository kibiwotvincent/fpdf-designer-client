<template>
    <section class="bg-white border-b py-8">
		<div class="container mx-auto flex flex-wrap pt-4 pb-12">
			<h1 class="w-full my-2 text-4xl sm:text-5xl font-bold leading-tight text-center text-gray-800">
				Easy as 1-2-3
			</h1>
			<div class="w-full mb-4">
				<div class="h-1 mx-auto purple-gradient w-64 opacity-50 my-0 py-0 rounded-t"></div>
			</div>
			<h4 class="w-full mt-2 mb-8 leading-tight text-center text-gray-600">
				Design the document in the design panel then download the php code required to create it.
			</h4>
        
			<div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
				<div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
					<div class="flex-col text-center">
						<div class="flex items-center justify-center">
							<img src="assets/images/design.svg" width="120px" />
						</div>
					</div>
					<div class="w-full font-bold text-xl text-gray-800 px-6 py-6 text-center">
						Design
					</div>
					<p class="text-gray-600 text-base px-6 mb-5 text-center">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
				</div>
			</div>
			<div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
				<div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
					<div class="flex-col text-center">
						<div class="flex items-center justify-center">
							<img src="assets/images/preview.svg" width="200px" />
						</div>
					</div>
					<div class="w-full font-bold text-xl text-gray-800 px-6 py-6 text-center">
						Preview
					</div>
					<p class="text-gray-600 text-base px-6 mb-5 text-center">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
				</div>
			</div>
			<div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
				<div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
					<div class="flex-col text-center">
						<div class="flex items-center justify-center">
							<img src="assets/images/download.svg" width="170px" />
						</div>
					</div>
					<div class="w-full font-bold text-xl text-gray-800 px-6 py-6 text-center">
						Download
					</div>
					<p class="text-gray-600 text-base px-6 mb-5 text-center">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
				</div>
			</div>
		</div>
    </section>
</template>

<script>
export default {
  name: 'HomepageSteps',
  props: {
    
  }
}
</script>
