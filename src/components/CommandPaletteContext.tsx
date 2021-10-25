import {
  CSSProperties,
} from 'react';
import {
  Keyboard,
} from './Keyboard';

import {
  MatchedText,
} from './MatchedText';

import {
  createQuickPickContext,
} from './QuickPick';

import {
  Keys,
} from '../keybindings';

import {
  createTextFilter,
} from '../text-filters'

import type {
  Command,
} from '../commands';

interface CommandPaletteItem {
  name: string;
  command: Command;
  keys: Keys;
}

const itemStyle: CSSProperties = {
  display: 'flex',
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
  {name, matchedIndexes, content}: any,
  isSelected: boolean,
) => {
  return (
    <div
      style={isSelected ? itemStyleSelected : itemStyle}
    >
      <MatchedText text={name} matchedIndexes={matchedIndexes} />
      <div style={{marginLeft: 'auto'}}>
        <Keyboard keys={content.keys} />
      </div>
    </div>
  );
};

const {
  QuickPickContext: CommandPaletteContext,
  QuickPickProvider: CommandPaletteProvider,
} = createQuickPickContext<CommandPaletteItem>({
  renderItem,
  textFilter: createTextFilter('fuzzyFilter', {ignoreCase: true}),
});

export {
  CommandPaletteContext,
  CommandPaletteProvider,
};
