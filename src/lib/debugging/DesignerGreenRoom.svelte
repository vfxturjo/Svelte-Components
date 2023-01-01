<script lang="ts">
import HoverZoomCard from "../Comp_Utilities/hoverZoomCard.svelte";
import FxMousePointer from "./../Comp_FX/FxMousePointer.svelte";
// import AboutMe from "../AboutMe/AboutMe.svelte";
</script>

<!-- for centering elements -->
<!-- <div class=" min-h-full min-w-full flex justify-center items-center"> -->

<!-- Normally -->
<div>
  <!-- <AboutMe /> -->
  <FxMousePointer JS_Anim="{true}" />
</div>

<div class="centered_elements">
  <HoverZoomCard placeholder="{true}" />
  <HoverZoomCard placeholder="{true}" />
  <HoverZoomCard placeholder="{true}" />
</div>

<style>
.centered_elements {
  height: 80vh;
  margin: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 4vw, 100px);
}
</style>
