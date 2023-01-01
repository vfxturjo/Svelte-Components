<script>
import { fade } from "svelte/transition";
import { scale } from "svelte/transition";
import { quintOut } from "svelte/easing";
import { Circle } from "svelte-loading-spinners";
import { fetchOne } from "./data_provide_api";

export let character;

let hovering = false;
let requested = false;
let resolve = null;
let promise = new Promise((newResolve, _) => (resolve = newResolve));

const enter = () => {
    hovering = true;
    if (!requested) {
        requested = true;
        fetchOne(character.id).then(resolve);
    }
};

const leave = () => (hovering = false);
</script>

<div class="relative" on:mouseenter="{enter}" on:mouseleave="{leave}">
    {character.name}

    {#if hovering}
        <div
            in:scale="{{ duration: 150, easing: quintOut, opacity: 0 }}"
            class="absolute border shadow-xl top-4 left-8 z-50 bg-white shadow-xl rounded-lg p-2 w-48"
        >
            <h3 class="text-lg font-semibold">
                {character.name}
            </h3>

            {#await promise}
                <p class="text-sm flex items-center">
                    <Circle size="0.8" unit="em" /><span class="ml-2"
                        >loading...</span
                    >
                </p>
            {:then details}
                <div in:fade="{{ duration: 150 }}">
                    {details.bio}
                </div>
            {/await}
        </div>
    {/if}
</div>
