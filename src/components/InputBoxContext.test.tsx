import React from 'react';
import ReactDOM from 'react-dom';

import {InputBoxContext, InputBoxProvider} from './InputBoxContext';

// TODO: add more tests.

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <InputBoxProvider
      modalAppElement={div}
    >
      <div>hoge</div>
    </InputBoxProvider>,
    div
  );
});

