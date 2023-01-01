<script>
export let placeholder = false;
export let dataType = "link";
</script>

{#if placeholder}
    <div
        class="interactable"
        data-type="{dataType}"
        style="background-image: url(https://images.unsplash.com/photo-1657739774592-14c8f97eaece?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60)"
    ></div>
{:else}
    <span></span>
{/if}

<style>
.interactable {
    aspect-ratio: 1 / 1.5;
    width: clamp(120px, 40vmin, 600px);
    background-position: center 50%;
    background-size: 100%;
    opacity: 0.4;

    transition: background-size 400ms ease, opacity 400ms ease;
}

.interactable:hover {
    background-size: 105%;
    opacity: 0.8;
}
</style>
