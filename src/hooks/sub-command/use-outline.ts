import {
  useState,
} from 'react';

import type {
  OutlineCommand,
  CommandCallback,
} from '../../commands';

import {
  outlineNodeToPageNumber,
} from '../../pdf';

import type {
  PDFDocumentProxy,
  OutlineNode,
} from '../../pdf';

import type {
  QuickPickGlobals,
} from '../../components/QuickPick';

import type {
  OutlineNodeItem,
} from '../../components/OutlineSelectorContext';

type UseOutlineReturnType = [
  {
  },
  Record<OutlineCommand, CommandCallback>,
  {
    onOutlineLoadSuccess: (outline: OutlineNode[]) => void;
  },
];

const useOutlineCommand = ({
  pdf,
  isModalOpen,
  jumpPage,
  outlineSelector,
}: {
  pdf: PDFDocumentProxy | null;
  isModalOpen: boolean;
  jumpPage: (pageNumber: number) => void;
  outlineSelector: QuickPickGlobals<OutlineNodeItem>;
}): UseOutlineReturnType => {
  const [outline, setOutline] = useState<OutlineNode[] | null>(null);
  const onOutlineLoadSuccess = (outline: OutlineNode[]) => {
    setOutline(outline);
  };

  const goToOutline = async () => {
    if (!pdf || !outline) return;
    if (isModalOpen) return;

    const result = await outlineSelector.showQuickPick(
      outline
        .map((outlineNode) => ({name: outlineNode.title, content: outlineNode})),
      {});
    if (!result) return;

    const targetPageNumber = await outlineNodeToPageNumber({
      pdf,
      outlineNode: result.content
    });
    jumpPage(targetPageNumber);
  };

  const goToOutlineRecursive = async () => {
    if (!pdf || !outline) return;
    if (isModalOpen) return;

    let outlineNode: OutlineNode | null = null;
    let items: OutlineNode[] = outline;

    // while outline has 'items', select item recursively.
    while (items?.length) {
      const result = await outlineSelector.showQuickPick(
        items
          .map((outlineNode) => ({name: outlineNode.title, content: outlineNode})),
        {});
      if (!result) return;

      outlineNode = result.content;
      items = outlineNode.items;
    }

    if (!outlineNode) return;

    const targetPageNumber = await outlineNodeToPageNumber({
      pdf,
      outlineNode,
    });
    jumpPage(targetPageNumber);
  };

  return [
    {
    },
    {
      goToOutline,
      goToOutlineRecursive,
    },
    {
      onOutlineLoadSuccess,
    },
  ];
}

export {
  useOutlineCommand
};
