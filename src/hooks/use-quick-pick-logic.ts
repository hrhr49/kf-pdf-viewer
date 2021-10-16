import {
  useState,
  useEffect,
  useCallback
} from 'react';

import {
  useFlag,
} from './use-flag';

import type {
  TextFilter,
} from '../text-filters';

interface QuickPickItem<Content> {
  name: string;
  matchedIndexes: number[];
  content: Content;
}

interface HasName {
  name: string;
}

const useQuickPickLogic = <Item extends HasName>({
  items,
  textFilter,
}: {
  items: Item[],
  textFilter: TextFilter,
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, {on: isOpenOn, off: isOpenOff}] = useFlag(false);
  const [matchedItems, setMatchedItems] = useState<QuickPickItem<Item>[]>([]);

  const open = useCallback(() => {
    setInputText('');
    setSelectedIndex(0);
    isOpenOn();
  }, [isOpenOn]);

  const close = useCallback(() => {
    setInputText('');
    setSelectedIndex(0);
    isOpenOff();
  }, [isOpenOff]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const select = useCallback<() => Item | null>(() => {
    const selectedItem = matchedItems[selectedIndex]?.content ?? null;
    close();
    return selectedItem;
  }, [selectedIndex, matchedItems, close]);

  const chanegeInputText = useCallback((newInputText: string) => {
    setInputText(newInputText);
    setSelectedIndex(0);
  }, []);

  const nextItem = useCallback(() => {
    setSelectedIndex((prev) => Math.min(prev + 1, matchedItems.length - 1));
  }, [matchedItems]);

  const previousItem = useCallback(() => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    const newMatchedItems: QuickPickItem<Item>[] = [];
    items.forEach((item) => {
      const matchedIndexes = textFilter(inputText, item.name);
      if (matchedIndexes !== null) {
        newMatchedItems.push({
          name: item.name,
          matchedIndexes,
          content: item,
        });
      }
    });
    setMatchedItems(newMatchedItems);
  }, [inputText, isOpen, items, textFilter]);

  return {
    isOpen,
    open,
    close,
    toggle,
    nextItem,
    previousItem,
    select,
    chanegeInputText,
    matchedItems,
    selectedIndex,
  };
}

export {
  useQuickPickLogic,
};

export type {
  QuickPickItem,
  HasName,
};

