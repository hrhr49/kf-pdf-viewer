import {
  COMMANDS,
  commandToTitle,
} from './commands'

test('all command shoule be match regex /[a-zA-Z][a-zA-Z0-9]*/', () => {
  COMMANDS.forEach((command) => {
    expect(/[a-zA-Z][a-zA-Z0-9]*/.test(command)).toBe(true);
  });
});

test('commandToTitle', () => {
  expect(commandToTitle('doNothing')).toBe('Do Nothing');
  // expect(commandToTitle('seekTo90Percent')).toBe('Seek To 90 Percent');
});

