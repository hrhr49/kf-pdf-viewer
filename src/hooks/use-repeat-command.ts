import {useState, useEffect, useCallback} from 'react';

const REPEAT_MAX = 999;
const NO_REPEAT = -1;

// some command accept `repeatCount` to repeat the command.
const useRepeatCommand = () => {
  // NOTE: `-1` means `repeatCount is not specified`
  const [repeatCount, setRepeatCount] = useState(NO_REPEAT);

  useEffect(() => {

    const keypressHandler = (event: KeyboardEvent) => {
      if ('0123456789'.includes(event.key)) {
        const num = Number(event.key);
        setRepeatCount((currentRepeatCount) => {
          return Math.min(10 * Math.max(currentRepeatCount, 0) + num, REPEAT_MAX);
        });
      }
    };

    const keyupHandler = (event: KeyboardEvent) => {
      // NOTE: resetRepeatCount must be called after
      // keypress event of command.
      if (!('0123456789'.includes(event.key))) {
        setRepeatCount(NO_REPEAT);
      }
    };

    document.addEventListener('keypress', keypressHandler);
    document.addEventListener('keyup', keyupHandler);

    return () => {
      document.removeEventListener('keypress', keypressHandler);
      document.removeEventListener('keyup', keyupHandler);
    };
  }, []);

  const resetRepeatCount = useCallback(() => {
    setRepeatCount(NO_REPEAT);
  }, []);

  return [
    repeatCount,
    resetRepeatCount,
  ] as const;
};

export {
  useRepeatCommand,
  NO_REPEAT,
};
