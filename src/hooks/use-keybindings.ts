import {useEffect, useRef} from 'react';
import mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import type {
  Keys,
} from '../keybindings';

const useKeybindings = <AllCommandList extends readonly string[]>({
  keybindings,
  commandCallbacks,
  commands,
  bindGlobal = false,
  enabled = true,
}: {
  keybindings: Record<AllCommandList[number], Keys>;
  commandCallbacks: Record<AllCommandList[number], () => unknown>;
  commands: AllCommandList;
  bindGlobal?: boolean;
  enabled?: boolean;
}) => {
  const commandCallbacksRef = useRef(commandCallbacks);
  commandCallbacksRef.current = commandCallbacks;

  useEffect(() => {
    if (!enabled) return;
    commands.forEach((command: AllCommandList[number]) => {
      const keys = keybindings[command];
      if (keys) {
        // console.log('key bind', keys, command);
        if (bindGlobal) {
          mousetrap.bindGlobal(
            keys,
            (event) => {
              event.preventDefault();
              commandCallbacksRef.current[command]?.();
            }
          );
        } else {
          mousetrap.bind(
            keys,
            (event) => {
              event.preventDefault();
              commandCallbacksRef.current[command]?.();
            }
          );
        }
      }
    });

    return () => {
      commands.forEach((command: AllCommandList[number]) => {
        const keys = keybindings[command];
        // console.log('key unbind', keys, command);
        if (keys) {
          mousetrap.unbind(keys);
        }
      });
    };
  }, [keybindings, enabled, bindGlobal, commands]);

};

export {
  useKeybindings,
};
