import TimeInterval from "./TimeInterval.js";
export default class Slide {
    slideContainer;
    slides;
    controls;
    timer;
    index = 0;
    PREV_BUTTON_TEXT = "Previous image";
    NEXT_BUTTON_TEXT = "next image";
    timerInterval;
    constructor(slideContainer, slides, controls, timer = 5000) {
        this.slideContainer = slideContainer;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        this.timerInterval = null;
    }
    initSlide() {
        this.createControls();
        this.startAutoSlideShow();
    }
    startAutoSlideShow() {
        this.timerInterval?.clear();
        this.timerInterval = new TimeInterval(() => this.showSlideNext(), this.timer);
    }
    removeClassActive() {
        this.slides.forEach((slide) => {
            slide.classList.remove("active");
        });
    }
    showSlideNext() {
        if (this.index < this.slides.length - 1) {
            this.removeClassActive();
            this.index++;
            this.slides[this.index].classList.add("active");
        }
        else {
            this.removeClassActive();
            this.index = 0;
            this.slides[this.index].classList.add("active");
        }
    }
    showSlidePrev() {
        if (this.index > 0) {
            this.removeClassActive();
            this.index--;
            this.slides[this.index].classList.add("active");
        }
        else {
            this.removeClassActive();
            this.index = this.slides.length - 1;
            this.slides[this.index].classList.add("active");
        }
    }
    createControls() {
        const prevButton = this.createButton(this.PREV_BUTTON_TEXT);
        const nextButton = this.createButton(this.NEXT_BUTTON_TEXT);
        this.addClickListener(prevButton, () => {
            this.showSlidePrev();
            this.startAutoSlideShow();
        });
        this.addClickListener(nextButton, () => {
            this.showSlideNext();
            this.startAutoSlideShow();
        });
    }
    createButton(text) {
        const button = document.createElement("button");
        button.innerText = text;
        this.controls.appendChild(button);
        return button;
    }
    addClickListener(button, callback) {
        button.addEventListener("click", () => callback());
    }
}
//# sourceMappingURL=Slide.js.map