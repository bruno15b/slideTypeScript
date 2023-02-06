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
    pausedInterval;
    thumbItems;
    thumb;
    paused = false;
    constructor(slideContainer, slides, controls, timer = 5000) {
        this.slideContainer = slideContainer;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        this.timerInterval = null;
        this.pausedInterval = null;
        this.thumbItems = null;
        this.thumb = null;
    }
    initSlide() {
        this.createControls();
        this.createThumbItems();
        this.startAutoSlideShow();
    }
    startAutoSlideShow() {
        this.timerInterval?.clearInterval();
        if (this.slides[this.index] instanceof HTMLVideoElement) {
            this.autoVideo(this.slides[this.index]);
        }
        else {
            this.timerInterval = new TimeInterval(() => this.showSlideNext(), this.timer);
        }
        if (this.thumbItems) {
            this.thumb = this.thumbItems[this.index];
            this.setTimerThumb(this.thumb);
            this.thumbItems.forEach((thumb) => thumb.classList.remove("active"));
            this.thumb.classList.add("active");
        }
    }
    setTimerThumb(thumb) {
        if (this.slides[this.index] instanceof HTMLVideoElement) {
            const slide = this.slides[this.index];
            thumb.style.animationDuration = `${slide.duration}s`;
        }
        else {
            thumb.style.animationDuration = `${this.timer}ms`;
        }
    }
    autoVideo(video) {
        video.muted = true;
        video.play();
        let firstPlay = true;
        video.addEventListener("playing", () => {
            if (firstPlay)
                this.timerInterval = new TimeInterval(() => this.showSlideNext(), video.duration * 1000);
            firstPlay = false;
        });
    }
    removeActiveClassFromSlides() {
        this.slides.forEach((slide) => {
            slide.classList.remove("active");
            if (slide instanceof HTMLVideoElement) {
                this.resetVideo(slide);
            }
        });
    }
    resetVideo(video) {
        video.currentTime = 0;
        video.pause();
    }
    showSlideNext() {
        if (this.paused)
            return;
        if (this.index < this.slides.length - 1) {
            this.removeActiveClassFromSlides();
            this.index++;
            this.slides[this.index].classList.add("active");
        }
        else {
            this.removeActiveClassFromSlides();
            this.index = 0;
            this.slides[this.index].classList.add("active");
        }
        this.startAutoSlideShow();
    }
    showSlidePrev() {
        if (this.paused)
            return;
        if (this.index > 0) {
            this.removeActiveClassFromSlides();
            this.index--;
            this.slides[this.index].classList.add("active");
        }
        else {
            this.removeActiveClassFromSlides();
            this.index = this.slides.length - 1;
            this.slides[this.index].classList.add("active");
        }
        this.startAutoSlideShow();
    }
    pauseSlideShow() {
        this.pausedInterval = new TimeInterval(() => {
            this.timerInterval?.pauseInterval();
            this.pausedInterval?.clearInterval();
            this.paused = true;
            this.thumb?.classList.add("paused");
            if (this.slides[this.index] instanceof HTMLVideoElement) {
                const video = this.slides[this.index];
                video.pause();
            }
        }, 300);
    }
    continueSlideShow() {
        this.pausedInterval?.clearInterval();
        if (this.paused) {
            this.paused = false;
            this.timerInterval?.resumeInterval();
            this.thumb?.classList.remove("paused");
            if (this.slides[this.index] instanceof HTMLVideoElement) {
                const video = this.slides[this.index];
                video.play();
            }
        }
    }
    createButton(text) {
        const button = document.createElement("button");
        button.innerText = text;
        this.controls.appendChild(button);
        return button;
    }
    createControls() {
        const prevButton = this.createButton(this.PREV_BUTTON_TEXT);
        const nextButton = this.createButton(this.NEXT_BUTTON_TEXT);
        this.slideContainer.addEventListener("pointerdown", () => console.log("teste"));
        this.controls.addEventListener("pointerdown", () => this.pauseSlideShow());
        this.controls.addEventListener("pointerup", () => this.continueSlideShow());
        nextButton.addEventListener("pointerup", () => this.showSlideNext());
        prevButton.addEventListener("pointerup", () => this.showSlidePrev());
    }
    createThumbItems() {
        const thumContainer = document.createElement("div");
        thumContainer.id = "slide-thumb";
        for (let i = 0; i < this.slides.length; i++) {
            thumContainer.innerHTML += `<span><span class="thumb-item"></span></span>`;
        }
        this.controls.appendChild(thumContainer);
        this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
    }
}
//# sourceMappingURL=Slide.js.map