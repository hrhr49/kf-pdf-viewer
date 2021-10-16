import React from 'react';
import { render, screen } from '@testing-library/react';
import {LandingPage} from './LandingPage';

import {
  defaultKeybindings,
} from '../keybindings';

it('renders without crashing', () => {

  render(
    <LandingPage
      keybindings={defaultKeybindings}
    />
  );

  expect(screen.getByText('How to Use')).toBeInTheDocument();
});
