<script>
let x = 0;
let y = 0;

window.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
});
</script>

<p>Mouse position: ({x}, {y})</p>

<style>
p {
    position: fixed;
    top: 0;
    left: 0;
}
</style>
