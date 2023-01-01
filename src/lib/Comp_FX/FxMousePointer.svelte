<script>
import { spring } from "svelte/motion";
import { onMount } from "svelte";
import { color_theme } from "../../GlobalVars";
import mojs from "@mojs/core";

export let remove_original_cursor = false;
export let inner_circle_size_ratio = 2;
export let provide_cursor = true;
export let circle_color = "red";
export let provide_fill_cursor = false;
export let circle_radius = 4;
export let provide_outline_cursor = true;
export let border_radius = 1;
export let darkMode_Color = "green";
export let scaleFactor = 4;
export let clickFX = true;
export let clickFX_color = "pink";
export let clickFX_color_dark = "lime";

// ! Pointer Color
let current_cursor_color = circle_color;
let current_FX_color = clickFX_color;
$: {
    if (darkMode_Color !== undefined) {
        if ($color_theme === "dark") {
            current_cursor_color = darkMode_Color;
        } else {
            current_cursor_color = circle_color;
        }
    }
    if (clickFX_color_dark !== undefined) {
        if ($color_theme === "dark") {
            current_FX_color = clickFX_color_dark;
        } else {
            current_FX_color = clickFX_color;
        }
    }
}

let cursorPos = { x: 0, y: 0 };

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

// FX
$: bubbles = new mojs.Burst({
    left: 0,
    top: 0,
    radius: 25,
    count: 3,

    children: {
        stroke: current_FX_color,
        fill: "none",
        scale: 1,
        strokeWidth: { 8: 0 },
        radius: { 0: "rand(4, 8)" },
        degreeShift: "rand(-50, 50)",
        duration: 400,
        delay: "rand(0, 250)",
    },
});

function handleMouseDown(event) {
    bubbles.tune({ x: event.pageX, y: event.pageY }).generate().replay();
}
</script>

<svelte:body
    on:mouseleave="{handleMouseLeave}"
    on:mouseenter="{handleMouseEnter}"
    on:mousemove="{handleMouseMove}"
    on:mousedown="{clickFX ? handleMouseDown : () => {}}"
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

<div
    class="mouse-follow-script"
    id="cursor"
    style="
            top: {-circle_radius}px; left: {-circle_radius}px;
            width: {circle_radius * 2}px;
            height: {circle_radius * 2}px;
            "
>
    {#if provide_cursor}
        {#if provide_outline_cursor}
            <div
                style="
                    width: {circle_radius * 2}px;
                    height: {circle_radius * 2}px;
                    border: {border_radius}px solid {current_cursor_color};
                    border-radius: 50%;"
            ></div>
        {/if}
        {#if provide_fill_cursor}
            <div
                style="
                    width: {circle_radius * 2}px;
                    height: {circle_radius * 2}px;
                    background-color: {current_cursor_color};
                    border-radius: 50%;"
            ></div>
        {/if}
    {:else}
        <span></span>
    {/if}
</div>

<style>
.mouse-follow-script {
    position: absolute;
    pointer-events: none;
    z-index: 100;
    transform-origin: center;
}

.mouse-main {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

[data-name="mojs-shape"] {
    pointer-events: none;
}

/* GET INSPIRATIONS FROM HERE:
https://codemyui.com/tag/mouse-pointer/ 
*/
</style>
