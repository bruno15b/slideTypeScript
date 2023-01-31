export default class TimeInterval {
  private id;
  private handler;

  constructor(handler: TimerHandler, timer: number) {
    this.id = setInterval(handler, timer);
    this.handler = handler;
  }

  clear() {
    clearInterval(this.id);
  }
}
