import { writable } from "svelte-local-storage-store";

export const Current_app = writable("Current_app", 0);
export const color_theme = writable("color-theme", "light");
