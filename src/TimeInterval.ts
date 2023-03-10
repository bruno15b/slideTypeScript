export default class TimeInterval {
  private id;
  private start;
  private handler;
  public remainingTime;

  constructor(handler: TimerHandler, timer: number) {
    this.id = setInterval(handler, timer);
    this.handler = handler;
    this.start = Date.now();
    this.remainingTime = timer;
  }

  clearInterval() {
    clearInterval(this.id);
  }

  pauseInterval() {
    const passed = Date.now() - this.start;
    this.remainingTime = this.remainingTime - passed;
    this.clearInterval();
  }

  resumeInterval() {
    this.clearInterval();
    this.id = setInterval(this.handler, this.remainingTime);
    this.start = Date.now();
  }
}
