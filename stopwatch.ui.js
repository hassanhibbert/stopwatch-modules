const StopWatchUI = (function (StopWatch) {
  //

  // Public API
  return {
    init
  };

  function init(config) {
    const { startButton, stopButton, resetButton } = config
  }

  const startButton = document.querySelector('.js-start-button');
  const stopButton = document.querySelector('.js-stop-button');
  const resetButton = document.querySelector('.js-reset-button');
  const duration = document.querySelector('.js-duration');
  let intervalTimer;

  resetButton.addEventListener('click', (event) => {
    sw.stop();
    sw.reset();
    duration.innerHTML = sw.getDuration();
  });

  startButton.addEventListener('click', (event) => {
    sw.start();
    intervalTimer = setInterval(() => {
      duration.innerHTML = sw.timeElapsed();
    }, 100);
  }, false);

  stopButton.addEventListener('click', (event) => {
    sw.stop();
    duration.innerHTML = sw.getDuration();
    clearInterval(intervalTimer);
  }, false);

}(StopWatch));