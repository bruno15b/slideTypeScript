import TimeInterval from "./TimeInterval.js";

export default class Slide {
  private slideContainer;
  private slides;
  private controls;
  private timer;
  private index = 0;
  readonly PREV_BUTTON_TEXT = "Previous image";
  readonly NEXT_BUTTON_TEXT = "next image";
  private timerInterval: TimeInterval | null;
  private pausedInterval: TimeInterval | null;
  private paused: boolean = false;

  constructor(slideContainer: Element, slides: Element[], controls: Element, timer: number = 5000) {
    this.slideContainer = slideContainer;
    this.slides = slides;
    this.controls = controls;
    this.timer = timer;

    this.timerInterval = null;
    this.pausedInterval = null;
  }

  initSlide() {
    this.createControls();
    this.startAutoSlideShow();
  }

  private startAutoSlideShow() {
    this.timerInterval?.clearInterval();
    this.timerInterval = new TimeInterval(() => this.showSlideNext(), this.timer);
  }

  private removeClassActive() {
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
    });
  }

  private showSlideNext() {
    if (this.paused) return;
    if (this.index < this.slides.length - 1) {
      this.removeClassActive();
      this.index++;
      this.slides[this.index].classList.add("active");
    } else {
      this.removeClassActive();
      this.index = 0;
      this.slides[this.index].classList.add("active");
    }
    this.startAutoSlideShow();
  }

  private showSlidePrev() {
    if (this.paused) return;
    if (this.index > 0) {
      this.removeClassActive();
      this.index--;
      this.slides[this.index].classList.add("active");
    } else {
      this.removeClassActive();
      this.index = this.slides.length - 1;
      this.slides[this.index].classList.add("active");
    }
    this.startAutoSlideShow();
  }

  private pause() {
    this.pausedInterval = new TimeInterval(() => {
      this.timerInterval?.pauseInterval();
      this.pausedInterval?.clearInterval();
      this.paused = true;
    }, 300);
  }

  private continue() {
    this.pausedInterval?.clearInterval();
    if (this.paused) {
      this.paused = false;
      this.timerInterval?.resumeInterval();
    }
  }

  private createButton(text: string) {
    const button = document.createElement("button");
    button.innerText = text;
    this.controls.appendChild(button);

    return button;
  }

  private createControls() {
    const prevButton = this.createButton(this.PREV_BUTTON_TEXT);
    const nextButton = this.createButton(this.NEXT_BUTTON_TEXT);

    this.slideContainer.addEventListener("pointerdown", () => console.log("teste"));

    this.controls.addEventListener("pointerdown", () => this.pause());
    this.controls.addEventListener("pointerup", () => this.continue());

    nextButton.addEventListener("pointerup", () => this.showSlideNext());
    prevButton.addEventListener("pointerup", () => this.showSlidePrev());
  }
}
