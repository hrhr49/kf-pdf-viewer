import type {
  RotateCommand,
  CommandCallback,
} from '../../commands';
import {useCyclicValue} from '../use-cyclic-value';

type UseRotateReturnType = [
  number,
  Record<RotateCommand, CommandCallback>,
];

const useRotateCommand = (): UseRotateReturnType => {
  const [rotate, {
    next: rotateRight,
    prev: rotateLeft,
  }] = useCyclicValue(0, 90, 180, 270);

  return [
    rotate,
    {
      rotateRight,
      rotateLeft,
    }
  ];
};

export {useRotateCommand};
