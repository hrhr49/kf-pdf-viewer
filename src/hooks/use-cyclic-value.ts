import {useState, useCallback} from 'react';

const useCyclicValue = <T>(
  ...values: [T, ...T[]]
) => {
  const [index, setIndex] = useState(0);

  const callbacks = {
    next: useCallback(()  => {
      setIndex((curIndex) => (curIndex + 1) % values.length);
    }, [values.length]),

    prev: useCallback(()  => {
      setIndex((curIndex) => (curIndex - 1 + values.length) % values.length);
    }, [values.length]),

    default: useCallback(() => {
      setIndex(0);
    }, []),
  } as const;

  return [values[index], callbacks] as const;
};

export {
  useCyclicValue,
};
