<template>
    <section> 
		<div class="bubble-1 bubble-container bubble-animation-x">
			<div class="bubble-small bubble-animation-y"></div>
		</div>
		
		<div class="bubble-2 bubble-container bubble-container-3 bubble-animation-x">
			<div class="bubble-medium bubble-animation-y"></div>
		</div>
		
		<div class="bubble-3 bubble-container bubble-animation-x">
			<div class="bubble-medium bubble-animation-y"></div>
		</div>
		
		<div class="bubble-4 bubble-container bubble-container-2 bubble-animation-x">
			<div class="bubble-large bubble-animation-y"></div>
		</div>
		
		<div class="bubble-5 bubble-container bubble-animation-x">
			<div class="bubble-small bubble-animation-y"></div>
		</div>
		
		<div class="bubble-6 bubble-container bubble-container-1 bubble-animation-x">
			<div class="bubble-large bubble-animation-y"></div>
		</div>
	</section>
</template>

<script>
export default {
  name: 'HomepageBubbles',
  props: {
    
  }
}
</script>
<style scoped>
/* Main bubbles */

.bubble-1 {
  left: 18%;
  animation-delay: 0s;
}
.bubble-1 .bubble-animation-y{
  animation-duration: 27s;
  animation-delay: 0s;
}

.bubble-2 {
  left: 40%;
  animation-delay: 2s;
}
.bubble-2 .bubble-animation-y{
  animation-duration: 25s;
  animation-delay: 0s;
}

.bubble-3 {
  right: 15%;
  animation-delay: 0s;
}
.bubble-3 .bubble-animation-y{
  animation-duration: 23s;
  animation-delay: 0s;
}

.bubble-4 {
  left: 8%; 
  animation-delay: 0s;
}
.bubble-4 .bubble-animation-y{
  animation-duration: 35s;
  animation-delay: 0s;
}

.bubble-5 {
  right: 18%; 
  animation-delay: 0s;
}
.bubble-5 .bubble-animation-y{
  animation-duration: 32s;
  animation-delay: 0;
}

.bubble-6 {
  left: 45%;
  animation-delay: 0s;
}
.bubble-6 .bubble-animation-y{
  animation-duration: 33s;
  animation-delay: 0s;
}


/* Static Circles */

.bubble-container{
  position: absolute;
  top: 55%; 
}

.bubble-container.bubble-container-1{
  top: 35%; 
}

.bubble-container.bubble-container-2{
  top: 45%; 
}
.bubble-container.bubble-container-3{
  top: 50%; 
}

.bubble-large, .bubble-medium, .bubble-small {
  border-radius: 100%;  
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 
  inset 0px 10px 30px 5px rgba(96, 147, 195, 1);
}

.bubble-large {
  width: 65px;
  height: 65px;
}

.bubble-medium {
  width: 40px;
  height: 40px;
}

.bubble-small {
  width: 20px;
  height: 20px;
}

.bubble-animation-x { 
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: bubbleXAnimFrames;
  animation-timing-function: ease;
  animation-direction: alternate;
}

.bubble-animation-y { 
  animation-iteration-count: infinite;
  animation-name: bubbleYAnimFrames;
  animation-timing-function: linear;
}


 @keyframes bubbleXAnimFrames {
  0% {
    transform: translateX(0);
   }
  100% {
    transform: translateX(50px);
   }
}

 @keyframes bubbleYAnimFrames {
  0% {
    transform: translateY(0);
   }
  50% {
    opacity: 85%;
   }
  100% {
    transform: translateY(-1250px);
    opacity: 0;
   }
}
</style>