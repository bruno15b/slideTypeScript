import Slide from "./Slide.js";

const container = document.querySelector(".slide");
const slidesPages = document.querySelectorAll(".slide-pages *");
const controls = document.querySelector(".slide-controls");

if (container && slidesPages && controls) {
  const slide = new Slide(container, Array.from(slidesPages), controls);
  slide.initSlide();
}
