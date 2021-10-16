import React from 'react';
import { render, screen } from '@testing-library/react';
import {Keyboard} from './Keyboard';

import {
  defaultKeybindings,
} from '../keybindings';

it('renders without crashing when no keys', () => {
  render(
    <Keyboard
      keys={null}
    />
  );
});

it('renders without crashing when 1 key', () => {
  render(
    <Keyboard
      keys="a"
    />
  );
  expect(screen.getByText('a')).toBeInTheDocument();
});

it('renders without crashing when multiple keys', () => {
  render(
    <Keyboard
      keys={['a', 'b']}
    />
  );
  expect(screen.getByText('a')).toBeInTheDocument();
  expect(screen.getByText('b')).toBeInTheDocument();
});
