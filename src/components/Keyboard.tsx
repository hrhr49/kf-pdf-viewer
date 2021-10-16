import {
  FC,
  CSSProperties,
} from 'react';

import {
  Keys,
} from '../keybindings';

const keyboardStyle: CSSProperties = {
  margin: '3px 5px',
  padding: '1px 3px',
  backgroundColor: '#f9f9f9',
  border: '1px solid #aaa',
  borderRadius: '2px',
  boxShadow: '1px 2px 2px #ddd',
  fontSize: '0.85em',
};

const Keyboard: FC<{keys: Keys}> = ({keys}: {keys: Keys}) => {
  const strList: string[] =
    keys === null
    ? []
    : typeof keys === 'string'
    ? [keys]
    : keys;

  return (
    <>
      {
        strList.map((str) => (
          <span
            key={str}
            style={keyboardStyle}
          >
            {str}
          </span>
        ))
      }
    </>
  );
};

export {
  Keyboard,
};
