import {
  CSSProperties,
} from 'react';

import {
  MatchedText,
} from './MatchedText';

import {
  createQuickPickContext,
} from './QuickPick';

import {
  createTextFilter,
} from '../text-filters'

import type {
  OutlineNode
} from '../pdf';

interface OutlineNodeItem {
  name: string;
  content: OutlineNode;
}

const itemStyle: CSSProperties = {
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: '4px 8px',
  boxSizing: 'border-box',
};

const itemStyleSelected: CSSProperties = {
  ...itemStyle,
  backgroundColor: '#ddd',
};

const renderItem = (
  {name, matchedIndexes}: {name: string; matchedIndexes: number[]},
  isSelected: boolean,
) => {
  return (
    <div
      style={isSelected ? itemStyleSelected : itemStyle}
    >
      <MatchedText text={name} matchedIndexes={matchedIndexes} />
    </div>
  );
};

const {
  QuickPickContext: OutlineSelectorContext,
  QuickPickProvider: OutlineSelectorProvider,
} = createQuickPickContext<OutlineNodeItem>({
  renderItem,
  textFilter: createTextFilter('fuzzyFilter', {ignoreCase: true}),
});

export {
  OutlineSelectorContext,
  OutlineSelectorProvider,
};

export type {
  OutlineNodeItem,
};
