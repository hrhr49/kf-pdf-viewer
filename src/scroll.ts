const animationHandlers: Handler[] = [];

interface Handler {
  id?: number;
}

const repeatFunc = (func: () => void): Handler => {
  let handler: Handler = {};
  const loop = () => {
    func();
    // reserve next frame process
    handler.id = requestAnimationFrame(loop);
  }
  // first call
  handler.id = requestAnimationFrame(loop);
  return handler;
};

const cancelRepeatFunc = (handler: Handler) => {
  if(handler.id !== undefined) {
    cancelAnimationFrame(handler.id);
  }
};

const startScroll = (container: HTMLElement, scrollOptions: any): void => {
  if(animationHandlers.length > 0)return;
  //stopScroll();
  const handler = repeatFunc(() => {
    container.scrollBy(scrollOptions);
  });
  animationHandlers.push(handler);
};

const stopScroll = (): void => {
  while(true) {
    const handler = animationHandlers.pop();
    if (!handler) break;
    cancelRepeatFunc(handler);
  }
};

export {startScroll, stopScroll};
