<script>
import { spring } from "svelte/motion";
import { onMount } from "svelte";
import { color_theme } from "../../GlobalVars";

export let JS_Anim = false;
export let remove_original_cursor = false;
export let inner_circle_size_ratio = 2;
// export let use_spring = true;        // ! ANOTHER WITH SPRING???
// export let provide_outline_cursor = true;
export let provide_circle_cursor = true;
export let circle_radius = 4;
export let circle_color = "red";
export let darkMode_Color = "green";
export let scaleFactor = 4;
// export let hide_cursor = true;

// ! Pointer Color
let current_cursor_color = circle_color;
$: {
    if (darkMode_Color !== undefined) {
        if ($color_theme === "dark") {
            current_cursor_color = darkMode_Color;
        } else {
            current_cursor_color = circle_color;
        }
    }
}

let cursorPos = { x: 0, y: 0 };

function handleMouseDown(event) {
    console.log("a");
}

let cursorObject = document.getElementById("cursor");
let cursorMainObject = document.getElementById("cursor_main");
onMount(() => {
    cursorObject = document.getElementById("cursor");
    if (remove_original_cursor) {
        document.body.style.cursor = "none";
    }
});

const easings = {
    duration: 500, // duration in milliseconds
    easing: "ease-in-out",
    fill: "forwards",
};

function handleMouseMove(event) {
    cursorPos = { x: event.clientX, y: event.clientY };
    if (event.target.getAttribute("data-type") !== null) {
        // let allowed_dataTypes = ["link", "picture"];         // IF INSIDE ICON NEEDED
        // $: interacting = allowed_dataTypes.indexOf(hovering) !== -1 ? true : false;
        cursorObject.animate(
            {
                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) 
                scale(${scaleFactor})`,
            }, // @ts-ignore
            easings
        );
    } else {
        cursorObject.animate(
            { transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }, // @ts-ignore
            easings
        );
    }
}
// Mouse enter and leave window
function handleMouseLeave() {
    // @ts-ignore
    cursorObject.animate({ opacity: 0 }, easings);
}
function handleMouseEnter() {
    // @ts-ignore
    cursorObject.animate({ opacity: 1 }, easings);
}
</script>

<svelte:body
    on:mouseleave="{handleMouseLeave}"
    on:mouseenter="{handleMouseEnter}"
    on:mousemove="{handleMouseMove}"
    on:mousedown="{handleMouseDown}"
/>

{#if remove_original_cursor}
    <div
        class="mouse-main"
        id="cursor_main"
        style="
    transform: translate(
            {cursorPos.x - inner_circle_size_ratio * circle_radius}px, 
            {cursorPos.y - inner_circle_size_ratio * circle_radius}px);
    pointer-events: none;
"
    >
        <div
            style="
        width: {circle_radius * 2 * inner_circle_size_ratio}px;
        height: {circle_radius * 2 * inner_circle_size_ratio}px;
        background-color: {current_cursor_color};
        border-radius: 50%;"
        ></div>
    </div>
{/if}

{#if JS_Anim}
    <div
        class="mouse-follow-script"
        style="
            top: {-circle_radius}px; left: {-circle_radius}px;
            width: {circle_radius * 2}px;
            height: {circle_radius * 2}px;
            "
    >
        {#if provide_circle_cursor}
            <div
                id="cursor"
                style="
                    width: {circle_radius * 2}px;
                    height: {circle_radius * 2}px;
                    background-color: {current_cursor_color};
                    border-radius: 50%;"
            ></div>
        {:else}
            <span></span>
        {/if}
    </div>
{:else}
    <div
        class="mouse-follow-css"
        style="
            transform: translate({circle_radius}px, {-circle_radius}px);
            pointer-events: none;
            width: {circle_radius * 2}px;
            height: {circle_radius * 2}px;
        "
    >
        {#if provide_circle_cursor}
            <div
                id="cursor"
                style="
                    width: {circle_radius * 2}px;
                    height: {circle_radius * 2}px;
                    background-color: {current_cursor_color};
                    border-radius: 50%;"
            ></div>
        {:else}
            <span></span>
        {/if}
    </div>
{/if}

<p>
    mouseposition = {cursorPos.x}
    {cursorPos.y}
</p>

<style>
.mouse-follow-script {
    position: absolute;
    pointer-events: none;
    z-index: 100;
}

.mouse-follow-css {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: transform 0.2s ease-out;
}
.mouse-main {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

/* GET INSPIRATIONS FROM HERE:
https://codemyui.com/tag/mouse-pointer/ 
*/
</style>
