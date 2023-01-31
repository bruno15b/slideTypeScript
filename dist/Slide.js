export default class Slide {
    slides;
    controls;
    index = 0;
    PREV_BUTTON_TEXT = "<<<";
    NEXT_BUTTON_TEXT = ">>>";
    constructor(slideContainer, slides, controls, timer = 2000) {
        this.slides = slides;
        this.controls = controls;
    }
    initSlide() {
        this.createControls();
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
    }
    showSlidePrev() {
        if (this.index > 0) {
            this.removeClassActive();
            this.index--;
            this.slides[this.index].classList.add("active");
        }
    }
    createControls() {
        const prevButton = this.createButton(this.PREV_BUTTON_TEXT);
        const nextButton = this.createButton(this.NEXT_BUTTON_TEXT);
        this.addClickListener(prevButton, () => this.showSlidePrev());
        this.addClickListener(nextButton, () => this.showSlideNext());
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