import {useState, useEffect, useCallback} from 'react';

import {
  startScroll,
  stopScroll,
} from '../../scroll';

import type {
  ScrollCommand,
  CommandCallback,
} from '../../commands';

import type {FixedSizeList, VariableSizeList} from 'react-window';

type List = FixedSizeList | VariableSizeList;

type UseScrollReturnType = [
  {
    isScrolling: boolean;
    scrollOffset: number;
    currentPageNumber: number;
  },
  Record<ScrollCommand, CommandCallback>,
  {
    onScroll: ({scrollOffset}: {scrollOffset: number}) => void;
  },
];

const useScrollCommand = ({
  list,
  listOuterDiv,
  scrollStep,
  scrollHalPageStep,
  paddingSize,
  pageHeight,
  height,
}: {
  list: List | null;
  listOuterDiv: HTMLDivElement | null;
  scrollStep: number;
  scrollHalPageStep: number;
  paddingSize: number;
  pageHeight: number;
  height: number;
}): UseScrollReturnType => {

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const keyupHandler = () => {
      stopScroll();
      setIsScrolling(false);
    };
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [setIsScrolling]);

  const calcCurrentPageNumber = useCallback((): number => {
    return Math.floor((scrollOffset + height / 2) / (pageHeight + paddingSize)) + 1;
  }, [scrollOffset, height, pageHeight, paddingSize]);

  const currentPageNumber = calcCurrentPageNumber();

  const scrollLeft = () => {
    // TODO
    alert('sorry not implemented yet');
  };

  const scrollRight = () => {
    // TODO
    alert('sorry not implemented yet');
  };

  const scrollReset = () => {
    // TODO
    alert('sorry not implemented yet');
  };

  const scrollUp = useCallback(async () => {
    if (listOuterDiv) {
      startScroll(listOuterDiv, {top: -scrollStep});
      setIsScrolling(true);
    }
  }, [listOuterDiv, scrollStep]);

  const scrollDown = useCallback(() => {
    if (listOuterDiv) {
      startScroll(listOuterDiv, {top: scrollStep});
      setIsScrolling(true);
    }
  }, [listOuterDiv, scrollStep]);

  const scrollHalfPageUp = useCallback(() => {
    if (listOuterDiv) {
      startScroll(listOuterDiv, {top: -scrollHalPageStep});
      setIsScrolling(true);
    }
  }, [listOuterDiv, scrollHalPageStep]);

  const scrollHalfPageDown = useCallback(() => {
    if (listOuterDiv) {
      startScroll(listOuterDiv, {top: scrollHalPageStep});
      setIsScrolling(true);
    }
  }, [listOuterDiv, scrollHalPageStep]);

  const scrollTop = useCallback(() => {
    list?.scrollTo(paddingSize + (pageHeight + paddingSize) * (currentPageNumber - 1));
  }, [currentPageNumber, pageHeight, list, paddingSize]);

  const scrollBottom = useCallback(() => {
    list?.scrollTo(paddingSize - height + (pageHeight + paddingSize) * currentPageNumber);
  }, [currentPageNumber, height, pageHeight, list, paddingSize]);

  const onScroll = useCallback(({scrollOffset}: {scrollOffset: number}) => {
    setScrollOffset(scrollOffset);
  }, []);

  return [
    {
      isScrolling,
      scrollOffset,
      currentPageNumber,
    },
    {
      scrollLeft,
      scrollRight,
      scrollUp,
      scrollDown,
      scrollHalfPageDown,
      scrollHalfPageUp,
      scrollTop,
      scrollBottom,
      scrollReset,
    },
    {
      onScroll,
    }
  ];
}

export {
  useScrollCommand
};
