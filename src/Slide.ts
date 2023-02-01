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
    if (this.slides[this.index] instanceof HTMLVideoElement) {
      this.autoVideo(this.slides[this.index] as HTMLVideoElement);
    } else {
      this.timerInterval = new TimeInterval(() => this.showSlideNext(), this.timer);
    }
  }

  private autoVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener("playing", () => {
      if (firstPlay) this.timerInterval = new TimeInterval(() => this.showSlideNext(), video.duration * 1000);
      firstPlay = false;
    });
  }

  private removeActiveClassFromSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
      if (slide instanceof HTMLVideoElement) {
        this.resetVideo(slide);
      }
    });
  }

  private resetVideo(video: HTMLVideoElement) {
    video.currentTime = 0;
    video.pause();
  }

  private showSlideNext() {
    if (this.paused) return;
    if (this.index < this.slides.length - 1) {
      this.removeActiveClassFromSlides();
      this.index++;
      this.slides[this.index].classList.add("active");
    } else {
      this.removeActiveClassFromSlides();
      this.index = 0;
      this.slides[this.index].classList.add("active");
    }
    this.startAutoSlideShow();
  }

  private showSlidePrev() {
    if (this.paused) return;
    if (this.index > 0) {
      this.removeActiveClassFromSlides();
      this.index--;
      this.slides[this.index].classList.add("active");
    } else {
      this.removeActiveClassFromSlides();
      this.index = this.slides.length - 1;
      this.slides[this.index].classList.add("active");
    }
    this.startAutoSlideShow();
  }

  private pauseSlideShow() {
    this.pausedInterval = new TimeInterval(() => {
      this.timerInterval?.pauseInterval();
      this.pausedInterval?.clearInterval();
      this.paused = true;
      if (this.slides[this.index] instanceof HTMLVideoElement) {
        const video = this.slides[this.index] as HTMLVideoElement;
        video.pause();
      }
    }, 300);
  }

  private continueSlideShow() {
    this.pausedInterval?.clearInterval();
    if (this.paused) {
      this.paused = false;
      this.timerInterval?.resumeInterval();
      if (this.slides[this.index] instanceof HTMLVideoElement) {
        const video = this.slides[this.index] as HTMLVideoElement;
        video.play();
      }
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

    this.controls.addEventListener("pointerdown", () => this.pauseSlideShow());
    this.controls.addEventListener("pointerup", () => this.continueSlideShow());

    nextButton.addEventListener("pointerup", () => this.showSlideNext());
    prevButton.addEventListener("pointerup", () => this.showSlidePrev());
  }
}
