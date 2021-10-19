// import {useState, useCallback} from 'react';

// const usePageHistory = (initialValue: boolean) => {
//   const [value, setValue] = useState(initialValue);

//   const callbacks = {
//     set: setValue,

//     on: useCallback(() => {
//       setValue(true);
//     }, []),

//     off: useCallback(() => {
//       setValue(false);
//     }, []),

//     toggle: useCallback(() => {
//       setValue((currentValue) => !currentValue);
//     }, []),
//   } as const;

//   return [value, callbacks] as const;
// };

// export {
//   useFlag,
// };

  // const pushPageHistory = (pageNumber: number) => {
  //   setPageHistory([...pageHistory.slice(0, pageHistoryIndex + 1), pageNumber].slice(-histroyMaxSize));
  //   setPageHistoryIndex(pageHistoryIndex + 1);
  // };

  // const changePageNumber = (newPageNumber: number) => {
  //   pushPageHistory(newPageNumber);
  //   console.log(...pageHistory, newPageNumber);
  //   setPageNumber(newPageNumber);
  //   const current = refEl.current;
  //   if (current !== null) {
  //     current.scrollTo({top: 0});
  //   }
  // };
  //   [
  //     'forwardPageHistory',
  //     () => {
  //       if(pageHistory.length > 0 && pageHistoryIndex + 1 < pageHistory.length) {
  //         setPageHistoryIndex(pageHistoryIndex + 1);
  //         setPageNumber(pageHistory[pageHistoryIndex + 1]);
  //       }
  //     }
  //   ],
  //   [
  //     'backwardPageHistory',
  //     () => {
  //       console.log(pageHistory);
  //       console.log(pageHistoryIndex);
  //       if(pageHistory.length > 0 && pageHistoryIndex - 1 >= 0) {
  //         setPageHistoryIndex(pageHistoryIndex - 1);
  //         setPageNumber(pageHistory[pageHistoryIndex - 1]);
  //       }
  //     }
  //   ],

export {
};
