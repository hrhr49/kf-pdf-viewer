import type {
  ShowInfoCommand,
  CommandCallback,
} from '../../commands';
import {useFlag} from '../use-flag';

type UseShowInfoReturnType = [
  boolean,
  Record<ShowInfoCommand, CommandCallback>,
];

const useShowInfoCommand = (
  defaultValue: boolean
): UseShowInfoReturnType => {
  const [
    showInfo,
    {
      on: showInfoOn,
      off: showInfoOff,
      toggle: showInfoToggle,
    }
  ] = useFlag(defaultValue);

  return [
    showInfo,
    {
      showInfoOn,
      showInfoOff,
      showInfoToggle,
    }
  ];
};

export {useShowInfoCommand};
