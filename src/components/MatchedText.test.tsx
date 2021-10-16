import React from 'react';
import { render, screen } from '@testing-library/react';
import {MatchedText} from './MatchedText';

it('renders without crashing', () => {
  render(
    <MatchedText
      text="hoge"
      matchedIndexes={[0, 1]}
    />
  );

  expect(screen.getByText('h')).toBeInTheDocument();
  expect(screen.getByText('o')).toBeInTheDocument();
  expect(screen.getByText('g')).toBeInTheDocument();
  expect(screen.getByText('e')).toBeInTheDocument();

  // highlighed text
  expect(screen.getByText('h').style.color).toBe('coral');
  expect(screen.getByText('o').style.color).toBe('coral');

  // NOTE: rgb(51, 51, 51) === #333
  expect(screen.getByText('g').style.color).toBe('rgb(51, 51, 51)');
  expect(screen.getByText('e').style.color).toBe('rgb(51, 51, 51)');

});
