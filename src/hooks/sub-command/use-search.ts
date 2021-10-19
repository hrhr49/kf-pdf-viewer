import {
  useState,
  useEffect,
  useRef
} from 'react';

import type {
  SearchCommand,
  CommandCallback,
} from '../../commands';

import {
  getPageText,
} from '../../pdf';

import type {
  PDFDocumentProxy,
} from '../../pdf';

import type {
  InputBoxGlobals,
} from '../../components/InputBoxContext';

import {useFlag} from '../use-flag';
import {Deferred} from '../../deferred';

type UseSearchReturnType = [
  {
    keyword: string;
    isKeywordHighlighted: boolean;
  },
  Record<SearchCommand, CommandCallback>,
];

const useSearchCommand = ({
  pdf,
  isModalOpen,
  inputBox,
  currentPageNumber,
  numPages,
  jumpPage,
}: {
  pdf: PDFDocumentProxy | null;
  isModalOpen: boolean;
  inputBox: InputBoxGlobals;
  currentPageNumber: number;
  numPages: number;
  jumpPage: (pageNumber: number) => void;
}): UseSearchReturnType => {
  const [keyword, setKeyword] = useState('');
  const [isKeywordHighlighted, {
    toggle: highlightToggle,
  }] = useFlag(true);

  const [pageTexts, setPageTexts] = useState<string[]>([]);
  const [keywordHitPages, setKeywordHitPages] = useState<Set<number>>(new Set([]));

  const textLoadDeferred = useRef(new Deferred<void>());

  useEffect(() => {
    if (pdf === null) return;
    (async () => {
      const promises = new Array(pdf.numPages)
      .fill(null)
      .map(async (_, idx) => {
        const pageNumber = idx + 1;
        const page = await pdf.getPage(pageNumber);
        const text: string = await getPageText(page);
        return text;
      });
      const texts: string[] = await Promise.all(promises);
      setPageTexts(texts);
      textLoadDeferred.current.resolve(null);
    })();
  }, [pdf]);

  const searchText = async (keyword: string) => {
    // wait until text loading is finished
    await textLoadDeferred.current.promise;

    setKeyword(keyword);
    const hittedPages = pageTexts.map((text, idx) => {
      const pageNumber = idx + 1;
      if (text.includes(keyword)) {
        return pageNumber;
      } else {
        return -1;
      }
    })
    .filter((i) => i > 0);

    if (hittedPages.length > 0) {
      setKeywordHitPages(new Set(hittedPages));
    } else {
      alert(`can not find keyword: ${keyword}`);
    }
  };

  const pickSearchList = () => {
    // TODO
    alert('sorry not implemented yet');
  };

  const search = async () => {
    if (!pdf) return;
    if (isModalOpen) return;

    const newKeyword = await inputBox.showInputBox({
      prompt: 'input word to search'
    });
    if (newKeyword) {
      searchText(newKeyword);
    }
  };

  const searchNext = async () => {
    let tmpPageNumber = currentPageNumber + 1;
    while (true) {
      if (keywordHitPages.has(tmpPageNumber)) {
        break;
      }
      tmpPageNumber++;
      if (tmpPageNumber > numPages) {
        alert('can not find next search result');
        return;
      }
    }
    jumpPage(tmpPageNumber);
  };

  const searchPrev = async () => {
    let tmpPageNumber = currentPageNumber - 1;
    while (true) {
      if (keywordHitPages.has(tmpPageNumber)) {
        break;
      }
      tmpPageNumber--;
      if (tmpPageNumber < 1) {
        alert('can not find next search result');
        return;
      }
    }
    jumpPage(tmpPageNumber);
  };


  return [
    {
      keyword,
      isKeywordHighlighted,
    },
    {
      search,
      searchNext,
      searchPrev,
      pickSearchList,
      highlightToggle,
    },
  ];
}

export {
  useSearchCommand
};
