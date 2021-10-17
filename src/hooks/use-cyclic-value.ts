import {useState, useCallback} from 'react';

const useCyclicValue = <T>(
  ...values: [T, ...T[]]
) => {
  const [index, setIndex] = useState(0);

  const callbacks = {
    next: useCallback(()  => {
      setIndex((curIndex) => (curIndex + 1) % values.length);
    }, [values]),

    prev: useCallback(()  => {
      setIndex((curIndex) => (curIndex - 1 + values.length) % values.length);
    }, [values]),

    default: useCallback(() => {
      setIndex(0);
    }, [values]),
  } as const;

  return [values[index], callbacks] as const;
};

export {
  useCyclicValue,
};
