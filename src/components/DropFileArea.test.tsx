// import React from 'react';
import { render } from '@testing-library/react';
import {DropFileArea} from './DropFileArea';

it('renders without crashing', () => {

  render(
    <DropFileArea
      onDropFile={() => {}}
    >
      <div>hoge</div>
    </DropFileArea>
  );

  // TODO: simulate PDF file drop event.
  // const file = new File(['a'], 'a.mp4', { type: 'video/mp4'});
  // fireEvent.drop(

});
