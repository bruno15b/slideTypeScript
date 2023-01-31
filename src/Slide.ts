export default class Slide {
  private slides;
  private controls;
  private index = 0;
  readonly PREV_BUTTON_TEXT = "<<<";
  readonly NEXT_BUTTON_TEXT = ">>>";

  constructor(slideContainer: Element, slides: Element[], controls: Element, timer: number = 2000) {
    this.slides = slides;
    this.controls = controls;
  }

  initSlide() {
    this.createControls();
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
    }
  }

  private showSlidePrev() {
    if (this.index > 0) {
      this.removeClassActive();
      this.index--;
      this.slides[this.index].classList.add("active");
    }
  }

  private createControls() {
    const prevButton = this.createButton(this.PREV_BUTTON_TEXT);
    const nextButton = this.createButton(this.NEXT_BUTTON_TEXT);

    this.addClickListener(prevButton, () => this.showSlidePrev());
    this.addClickListener(nextButton, () => this.showSlideNext());
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
