import {useState, useCallback} from 'react';

const clipValue = (
  value: number,
  [min, max]: [number, number],
) => {
  return Math.min(Math.max(value, min), max);
};

const useClipedValue = (
  initialValue: number,
  {min, max, step = 0}: {min: number; max: number; step?: number},
) => {
  const [value, setRawValue] = useState(clipValue(initialValue, [min, max]));

  const callbacks = {

    set: useCallback((newValue: number) => {
      setRawValue(clipValue(newValue, [min, max]));
    }, [min, max]),

    up: useCallback(()  => {
      setRawValue((prev) => clipValue(prev + step, [min, max]));
    }, [min, max, step]),

    down: useCallback(()  => {
      setRawValue((prev) => clipValue(prev - step, [min, max]));
    }, [min, max, step]),

    min: useCallback(() => {
      setRawValue(min);
    }, [min]),

    max: useCallback(() => {
      setRawValue(max);
    }, [max]),

    default: useCallback(() => {
      setRawValue(clipValue(initialValue, [min, max]));
    }, [initialValue, min, max]),

  } as const;

  return [value, callbacks] as const;
};

export {
  useClipedValue,
};
