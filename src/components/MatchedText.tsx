import {
  FC,
  CSSProperties,
} from 'react';

const MatchedText: FC<{text: string; matchedIndexes: number[]}> = ({
  text,
  matchedIndexes,
}) => {
  const matchedIndexSet = new Set(matchedIndexes);
  return (
    <>
      {
        text
        .split('')
        .map((s, idx) => {
          const isMatched = matchedIndexSet.has(idx);
          const style: CSSProperties = {
            color: isMatched ? 'coral' : '#333',
            fontWeight: isMatched ? 'bold' : 'normal',
          };
          return (
            <span
              key={idx}
              style={style}
            >
              {s}
            </span>
          )
        })
      }
    </>
  );
};

export {
  MatchedText,
};
