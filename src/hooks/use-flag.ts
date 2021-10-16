import {useState, useCallback} from 'react';

const useFlag = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const callbacks = {
    set: setValue,

    on: useCallback(() => {
      setValue(true);
    }, []),

    off: useCallback(() => {
      setValue(false);
    }, []),

    toggle: useCallback(() => {
      setValue((currentValue) => !currentValue);
    }, []),
  } as const;

  return [value, callbacks] as const;
};

export {
  useFlag,
};
