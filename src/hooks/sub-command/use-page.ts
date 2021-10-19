import {useCallback} from 'react';
import type {
  PageCommand,
  CommandCallback,
} from '../../commands';

import type {FixedSizeList, VariableSizeList} from 'react-window';
import type {InputBoxGlobals} from '../../components/InputBoxContext';

type List = FixedSizeList | VariableSizeList;

type UsePageReturnType = [
  number,
  Record<PageCommand, CommandCallback>,
  {
    jumpPage: (targetPageNumber: number) => void;
  },
];

const usePageCommand = ({
  list,
  pageHeight,
  paddingSize,
  scrollOffset,
  numPages,
  isModalOpen,
  inputBox,
}: {
  list: List | null;
  pageHeight: number;
  height: number;
  paddingSize: number;
  scrollOffset: number;
  numPages: number;
  isModalOpen: boolean;
  inputBox: InputBoxGlobals;
}): UsePageReturnType => {

  const jumpPage = useCallback((targetPageNumber: number) => {
    if (!Number.isInteger(targetPageNumber)) return;

    if (targetPageNumber < 0) {
      // -1 -> numPages
      targetPageNumber += numPages + 1;
    }
    targetPageNumber = Math.max(1, Math.min(numPages, targetPageNumber));
    list?.scrollToItem(targetPageNumber - 1);
  }, [numPages, list]);

  const prevPage = useCallback(() => {
    list?.scrollTo(scrollOffset - (pageHeight + paddingSize));
  }, [scrollOffset, pageHeight, list, paddingSize]);

  const nextPage = useCallback(() => {
    list?.scrollTo(scrollOffset + (pageHeight + paddingSize));
  }, [scrollOffset, pageHeight, list, paddingSize]);

  const firstPage = useCallback(() => {
    jumpPage(1);
  }, [jumpPage]);

  const lastPage = useCallback(() => {
    jumpPage(-1);
  }, [jumpPage]);

  const goToPage = async () => {
    if (isModalOpen) return;
    const targetPageNumberStr = await inputBox.showInputBox({
      prompt: 'input page number to go',
    });
    try {
      if (targetPageNumberStr) {
        if (targetPageNumberStr.endsWith('%')) {
          const targetPageNumberPercent = Number(targetPageNumberStr.slice(0, -1));
          jumpPage(Math.floor(targetPageNumberPercent * numPages / 100));
        } else {
          const targetPageNumber = Number(targetPageNumberStr);
          jumpPage(targetPageNumber);
        }
      }
    } catch (e) {
      // do noting if input is invalid.
    }
  };

  return [
    0, // TODO
    {
      prevPage,
      nextPage,
      firstPage,
      lastPage,
      goToPage,
    },
    {
      jumpPage,
    },
  ];
};

export {usePageCommand};
