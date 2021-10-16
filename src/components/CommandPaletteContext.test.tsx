import React from 'react';
import ReactDOM from 'react-dom';

import {CommandPaletteContext, CommandPaletteProvider} from './CommandPaletteContext';

// TODO: add more tests.

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <CommandPaletteProvider
      modalAppElement={div}
    >
      <div>hoge</div>
    </CommandPaletteProvider>,
    div
  );
});

