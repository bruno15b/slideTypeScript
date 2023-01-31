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

  constructor(slideContainer: Element, slides: Element[], controls: Element, timer: number = 5000) {
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

  private startAutoSlideShow() {
    this.timerInterval?.clear();
    this.timerInterval = new TimeInterval(() => this.showSlideNext(), this.timer);
  }

  private removeClassActive() {
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
    });
  }

  private showSlideNext() {
    if (this.index < this.slides.length - 1) {
      this.removeClassActive();
      this.index++;
      this.slides[this.index].classList.add("active");
    } else {
      this.removeClassActive();
      this.index = 0;
      this.slides[this.index].classList.add("active");
    }
  }

  private showSlidePrev() {
    if (this.index > 0) {
      this.removeClassActive();
      this.index--;
      this.slides[this.index].classList.add("active");
    } else {
      this.removeClassActive();
      this.index = this.slides.length - 1;
      this.slides[this.index].classList.add("active");
    }
  }

  private createControls() {
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

  private createButton(text: string) {
    const button = document.createElement("button");
    button.innerText = text;
    this.controls.appendChild(button);

    return button;
  }

  private addClickListener(button: Element, callback: Function) {
    button.addEventListener("click", () => callback());
  }
}
