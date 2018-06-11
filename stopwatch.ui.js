const StopWatchUI = (function (StopWatch) {

  // UI element attribute names
  const uiTargetAttributes = {
   start: 'data-start',
   stop: 'data-stop',
   reset: 'data-reset'
  };

  // Store active instances of the StopWatch Interface
  const instances = {};

  const PublicAPI = {
    init() {
      setListeners.call(this, { event: 'click',  action: 'add' });
    },
    destroy() {
      setListeners.call(this, { event: 'click',  action: 'remove' });
    }
  };

  function StopWatchUI(selector = '') {
    const ctx = Object.create(PublicAPI);
    ctx.parentSelector = selector;
    ctx.elements = [...document.querySelectorAll(selector)];
    ctx.handler = onClickHandler.bind(ctx);
    ctx.init();
    return ctx;
  }

  return StopWatchUI;

  function findAncestor(el, cls) {
    cls = cls.replace('.', '');
    while ((el = el.parentNode) && el.className && el.className.indexOf(cls) < 0);
    return el;
  }

  // event delegation
  function onClickHandler(event) {
    event.preventDefault();
    const element = event.srcElement;

    // Find ui action that has been clicked
    const [target] = Object.values(uiTargetAttributes)
      .filter(attr => element.hasAttribute(attr));

    // Find stopwatch parent container
    const parentElement = findAncestor(element, this.parentSelector);

    // Trigger action if a stopwatch ui element has been clicked
    target && stopWatchActions(target, parentElement);
  }

  function generateId(element) {
    const id = Object.keys(instances).length;
    element.setAttribute('data-id', id);
    instances[id] = {
      timer: null,
      stopwatch: new StopWatch(),
      durationHTML: element.querySelector(`[data-duration]`)
    };
    return id;
  }

  function getId(element) {
    const id = element.hasAttribute('data-id') && element.getAttribute('data-id');
    return id || generateId(element);
  }

  function stopWatchActions(target, element) {
    const id = getId(element);
    const ui = instances[id];
    switch (target) {
      case uiTargetAttributes.start:
        if (ui.stopwatch.isRunning()) return;
        ui.stopwatch.start();
        ui.timer = setInterval(() => {
          ui.durationHTML.innerHTML = ui.stopwatch.timeElapsed();
        }, 100);
        break;
      case uiTargetAttributes.stop:
        ui.stopwatch.stop();
        ui.durationHTML.innerHTML = ui.stopwatch.getDuration();
        clearInterval(ui.timer);
        break;
      case uiTargetAttributes.reset:
        ui.stopwatch.stop();
        ui.stopwatch.reset();
        ui.durationHTML.innerHTML = ui.stopwatch.getDuration();
        clearInterval(ui.timer);
        break;
      default:
        console.log('default');
    }
  }

  function setListeners(config) {
    let { event, action } = config;
    let method = `${action}EventListener`;

    this.elements.forEach(element => {
      element[method](event, this.handler, false);
    });
  }

}(StopWatch));