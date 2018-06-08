const StopWatch = (function () {

  const utils = {
    calculateDuration(startTime, endTime) {
      return (endTime.getTime() - startTime.getTime()) / 1000;
    },
    toFixed(number) {
      return number.toFixed(2);
    }
  };

  const publicAPI = {
    start() {
      if (!this.running) {
        this.startTime = new Date();
        this.running = true;
      }
    },
    stop() {
      if (this.running) {
        this.running = false;
        this.duration += utils.calculateDuration(this.startTime, new Date());
      }
    },
    reset() {
      this.startTime = null;
      this.running = false;
      this.duration = 0;
    },
    timeElapsed() {
      return this.duration
        ? utils.toFixed(utils.calculateDuration(this.startTime, new Date()) + this.duration)
        : utils.toFixed(utils.calculateDuration(this.startTime, new Date()))
    },
    getDuration() {
      return utils.toFixed(this.duration);
    },
  };

  function StopWatch() {
    const ctx = Object.create(publicAPI);
    ctx.startTime = null;
    ctx.endTime = null;
    ctx.running = false;
    ctx.duration = 0;
    ctx.timePassed = 0;
    return ctx;
  }

  return StopWatch;
}());