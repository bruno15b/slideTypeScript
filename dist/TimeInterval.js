export default class TimeInterval {
    id;
    handler;
    constructor(handler, timer) {
        this.id = setInterval(handler, timer);
        this.handler = handler;
    }
    clear() {
        clearInterval(this.id);
    }
}
//# sourceMappingURL=TimeInterval.js.map