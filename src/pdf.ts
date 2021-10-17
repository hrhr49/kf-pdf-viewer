import type {
  PDFDocumentProxy,
  PDFPageProxy,
} from 'pdfjs-dist/types/display/api';


type PromiseResultType<T> = T extends Promise<infer U> ? U : never;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type ArrayItemType<T> = T extends (infer U)[] ? U : never;

type GetOutlineType = PDFDocumentProxy['getOutline'];
type GetOutlineReturnType = ReturnType<GetOutlineType>;
type GetOutlinePromiseResultType = PromiseResultType<GetOutlineReturnType>;

type OutlineNode = ArrayItemType<GetOutlinePromiseResultType>;
type OutlineDest = OutlineNode['dest'];

const outlineNodeToPageNumber = async ({
  pdf,
  outlineNode,
}: {
  pdf: PDFDocumentProxy;
  outlineNode: OutlineNode;
}): Promise<number> => {
  // TODO: improve
  let dest: any[] | null;
  if (typeof outlineNode.dest === 'string') {
    dest = await pdf.getDestination(outlineNode.dest);
  } else {
    dest = outlineNode.dest;
  }
  if (!dest) {
    throw Error(`can not get destination: ${dest}`);
  }
  const ref = dest[0];
  const pageIndex = await pdf.getPageIndex(ref);
  return pageIndex + 1;
};

const getPageText = async (page: PDFPageProxy) => {
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items
    .map(token => (token as any).str || '')
    .join('');
  return pageText;
};

export {
  outlineNodeToPageNumber,
  getPageText,
};

export type {
  PDFDocumentProxy,
  OutlineNode,
  OutlineDest,
};
