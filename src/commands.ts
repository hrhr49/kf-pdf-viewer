const COMMANDS = [
  'doNothing',

  'fullScreenOn',
  'fullScreenOff',
  'fullScreenToggle',

  'showInfoOn',
  'showInfoOff',
  'showInfoToggle',

  'prevPage',
  'nextPage',
  'firstPage',
  'lastPage',
  'goToPage',

  'zoomReset',
  'zoomIn',
  'zoomOut',
  'fitWidth',
  'fitHeight',
  'scrollLeft',
  'scrollRight',
  'scrollUp',
  'scrollDown',
  'scrollHalfPageDown',
  'scrollHalfPageUp',
  'scrollTop',
  'scrollBottom',
  'scrollReset',
  'rotateRight',
  'rotateLeft',
  'colorInvert',
  'invertColorRateUp',
  'invertColorRateDown',
  'highlightToggle',
  'sidebarToggle',
  'goToOutline',
  'goToOutlineRecursive',
  'search',
  'pickSearchList',
  'forwardPageHistory',
  'backwardPageHistory',

  'commandPaletteOpen',
  'loadUrl',
] as const;

type AllCommandList = typeof COMMANDS;
type Command = AllCommandList[number];

const isCommand = (obj: any): obj is Command => {
  return (
    typeof obj === 'string'
    && (COMMANDS as readonly string[]).includes(obj)
  );
};

// type CommandCallbacks = Partial<Record<Command, () => unknown>>;
type CommandCallbacks = Record<Command, () => unknown>;

const commandToTitle = (command: Command): string => {
  // example: 'fullScreenOn' -> 'Full Screen On'
  return command
    .replace(/^(\w)/, (v) => v.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2');
};

export {
  COMMANDS,
  commandToTitle,
  isCommand,
};

export type {
  AllCommandList,
  Command,
  CommandCallbacks,
};
