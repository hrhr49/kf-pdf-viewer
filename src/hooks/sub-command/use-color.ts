import type {
  ColorCommand,
  CommandCallback,
} from '../../commands';
import {useFlag} from '../use-flag';
import {useClipedValue} from '../use-cliped-value';

type UseColorCommandReturnType = [
  {
    isColorInverted: boolean;
    invertColorRate: number;
  },
  Record<ColorCommand, CommandCallback>
];

const useColorCommand = ({
  repeatCount
}: {
  repeatCount: number
}): UseColorCommandReturnType => {
  const [isColorInverted, {
    toggle: colorInvert,
  }] = useFlag(false);

  const [invertColorRate, {
    up: invertColorRateUp,
    down: invertColorRateDown,
  }] = useClipedValue(1, {min: 0.05, max: 1, step: 0.05 * Math.max(1, repeatCount)});

  return [
    {
      isColorInverted,
      invertColorRate,
    },
    {
      colorInvert,
      invertColorRateUp,
      invertColorRateDown,
    }
  ];
};

export {
  useColorCommand,
};
