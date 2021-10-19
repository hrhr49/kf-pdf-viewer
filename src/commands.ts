const FULL_SCREEN_COMMANDS = [
  'fullScreenOn',
  'fullScreenOff',
  'fullScreenToggle',
] as const;

const SHOW_INFO_COMMANDS = [
  'showInfoOn',
  'showInfoOff',
  'showInfoToggle',
] as const;

const PAGE_COMMANDS = [
  'prevPage',
  'nextPage',
  'firstPage',
  'lastPage',
  'goToPage',
] as const;

const ZOOM_COMMANDS = [
  'zoomReset',
  'zoomIn',
  'zoomOut',
  'zoomFitWidth',
  'zoomFitHeight',
] as const;

const SCROLL_COMMANDS = [
  'scrollLeft',
  'scrollRight',
  'scrollUp',
  'scrollDown',
  'scrollHalfPageDown',
  'scrollHalfPageUp',
  'scrollTop',
  'scrollBottom',
  'scrollReset',
] as const;

const ROTATE_COMMANDS = [
  'rotateRight',
  'rotateLeft',
] as const;

const COLOR_COMMANDS = [
  'colorInvert',
  'invertColorRateUp',
  'invertColorRateDown',
] as const;

const OUTLINE_COMMANDS = [
  'goToOutline',
  'goToOutlineRecursive',
] as const;

const SEARCH_COMMANDS = [
  'search',
  'searchNext',
  'searchPrev',
  'pickSearchList',
  'highlightToggle',
] as const;

const HISTORY_COMMANDS = [
  'forwardPageHistory',
  'backwardPageHistory',
] as const;

const COMMANDS = [
  'doNothing',

  ...FULL_SCREEN_COMMANDS,
  ...SHOW_INFO_COMMANDS,
  ...PAGE_COMMANDS,
  ...ZOOM_COMMANDS,
  ...SCROLL_COMMANDS,
  ...ROTATE_COMMANDS,
  ...COLOR_COMMANDS,

  'sidebarToggle',

  ...OUTLINE_COMMANDS,
  ...SEARCH_COMMANDS,
  ...HISTORY_COMMANDS,

  'commandPaletteOpen',
] as const;

type AllCommandList = typeof COMMANDS;

type Command = AllCommandList[number];

type FullScreenCommand = typeof FULL_SCREEN_COMMANDS[number];
type ShowInfoCommand = typeof SHOW_INFO_COMMANDS[number];
type PageCommand = typeof PAGE_COMMANDS[number];
type ZoomCommand = typeof ZOOM_COMMANDS[number];
type ScrollCommand = typeof SCROLL_COMMANDS[number];
type RotateCommand = typeof ROTATE_COMMANDS[number];
type ColorCommand = typeof COLOR_COMMANDS[number];
type OutlineCommand = typeof OUTLINE_COMMANDS[number];
type SearchCommand = typeof SEARCH_COMMANDS[number];
type HistoryCommand = typeof HISTORY_COMMANDS[number];

const isCommand = (obj: any): obj is Command => {
  return (
    typeof obj === 'string'
    && (COMMANDS as readonly string[]).includes(obj)
  );
};

// interface CommandCallbackObjType {
//   keyup: () => unknown;
//   keydown: () => unknown;
//   keypress: () => unknown;
// };

type CommandCallback = (
  (() => unknown)
);

// type CommandCallbacks = Partial<Record<Command, () => unknown>>;
type CommandCallbacks = Record<Command, CommandCallback>;

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
  FULL_SCREEN_COMMANDS,
  SHOW_INFO_COMMANDS,
  PAGE_COMMANDS,
  ZOOM_COMMANDS,
  SCROLL_COMMANDS,
  ROTATE_COMMANDS,
  COLOR_COMMANDS,
  OUTLINE_COMMANDS,
  SEARCH_COMMANDS,
  HISTORY_COMMANDS,
};

export type {
  AllCommandList,
  Command,
  CommandCallback,
  CommandCallbacks,
  FullScreenCommand,
  ShowInfoCommand,
  PageCommand,
  ZoomCommand,
  ScrollCommand,
  RotateCommand,
  ColorCommand,
  OutlineCommand,
  SearchCommand,
  HistoryCommand,
};
