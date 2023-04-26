import { VisArch } from "./visarch";

let vis: VisArch;

// main application the browser runs
window.onload = () => {
    vis = new VisArch();
    vis.init();
}

window.onresize = () => {
    vis.resize();
}