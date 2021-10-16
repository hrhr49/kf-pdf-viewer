import {
  defaultKeybindings,
  isPartialKeybindings,
} from './keybindings';

import type {
  Keys,
  Keybindings,
} from './keybindings';


test('jsonschema test', () => {

  expect(isPartialKeybindings({})).toBe(true);
  expect(isPartialKeybindings({fullScreenOn: null})).toBe(true);
  expect(isPartialKeybindings({fullScreenOn: 'a'})).toBe(true);
  expect(isPartialKeybindings({fullScreenOn: ['a', 'b']})).toBe(true);

  expect(() => isPartialKeybindings({unkownComand: null})).toThrow();
  expect(() => isPartialKeybindings({fullScreenOn: 1234})).toThrow();
  expect(() => isPartialKeybindings({fullScreenOn: {}})).toThrow();

  expect(() => isPartialKeybindings([])).toThrow();
  expect(() => isPartialKeybindings(null)).toThrow();
  expect(() => isPartialKeybindings(1234)).toThrow();
  expect(() => isPartialKeybindings('str')).toThrow();

});

// test('commandToTitle', () => {
//   expect(commandToTitle('fullScreenOn')).toBe('Full Screen On');
//   expect(commandToTitle('seekTo90Percent')).toBe('Seek To 90 Percent');
// });

