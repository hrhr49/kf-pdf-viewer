import {useCallback} from 'react';
import type {
  ZoomCommand,
  CommandCallback,
} from '../../commands';
import {useClipedValue} from '../use-cliped-value';

type UseZoomReturnType = [
  {
    scale: number;
    pageWidth: number;
    pageHeight: number;
  },
  Record<ZoomCommand, CommandCallback>,
];

const useZoomCommand = ({
  width,
  height,
  pageWidthRaw,
  pageHeightRaw,
  rotate,
}: {
  width: number;
  height: number;
  pageWidthRaw: number;
  pageHeightRaw: number;
  rotate: number;
}): UseZoomReturnType => {
  const [scale, {
    up: zoomIn,
    down: zoomOut,
    default: zoomReset,
    set: zoomSet,
  }] = useClipedValue(1, {min: 0.1, max: 4, step: 0.1});

  // const pageWidth = pageWidthRaw * scale;
  const pageHeight = ((rotate / 90) % 2 === 0) ? pageHeightRaw * scale : pageWidthRaw * scale;
  const pageWidth = ((rotate / 90) % 2 === 0) ? pageWidthRaw * scale : pageHeightRaw * scale;

  const zoomFitWidth = useCallback(() => {
    zoomSet(width / (pageWidth / scale));
  }, [zoomSet, width, pageWidth, scale]);

  const zoomFitHeight = useCallback(() => {
    zoomSet(height / (pageHeight / scale));
  }, [zoomSet, height, pageHeight, scale]);

  return [
    {
      scale,
      pageWidth,
      pageHeight,
    },
    {
      zoomIn,
      zoomOut,
      zoomReset,
      zoomFitWidth,
      zoomFitHeight,
    }
  ];
};

export {useZoomCommand};
