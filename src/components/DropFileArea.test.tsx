import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {DropFileArea} from './DropFileArea';

it('renders without crashing', () => {

  render(
    <DropFileArea
      onDropFile={() => {}}
    >
      <div>hoge</div>
    </DropFileArea>
  );

  // const file = new File(['a'], 'a.mp4', { type: 'video/mp4'});
  // fireEvent.drop(

});
