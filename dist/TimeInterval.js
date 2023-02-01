export default class TimeInterval {
    id;
    start;
    handler;
    remainingTime;
    constructor(handler, timer) {
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
//# sourceMappingURL=TimeInterval.js.map