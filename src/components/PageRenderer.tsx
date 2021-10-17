import {CSSProperties} from 'react';
import {Page} from 'react-pdf';

interface PageRendererDataType {
  scale: number;
  rotate: number;
  isKeywordHighlighted: boolean;
  keyword: string;
  paddingSize: number;
}

interface PageRendererProps {
  index: number;
  style: CSSProperties;
  data: PageRendererDataType;
}

const highlightPattern = (text: string, pattern: any) => {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return text;
  }

  const matches = text.match(pattern);

  return (
    splitText.reduce((arr: string[], element: any, index: number) => (matches && matches[index] ? [
      ...arr,
      element,
      <span
        key={index}
        style={{
          background: 'rgba(255, 0, 0, 0.3)',
        }}
      >
        {matches[index]}
      </span>,
    ] : [...arr, element]), [])
  );
};

const PageRenderer = ({index, style, data}: any) => {
  const {
    scale,
    rotate,
    isKeywordHighlighted,
    keyword,
    paddingSize,
  } = data;

  // const makeTextRenderer = (searchText: string) => (textItem: any) => highlightPattern(textItem.str, searchText);

  const textRenderer = ({str}:any) => {
    return <>{highlightPattern(str, keyword)}</>;
  }

  return (
    <div style={{
      ...style,
      top: `${parseFloat(style.top) + paddingSize}px`,
    }}
    >
      <Page
        pageNumber={index + 1}
        scale={scale}
        rotate={rotate}
        customTextRenderer={isKeywordHighlighted ? textRenderer : undefined}
        onLoadError={(error) => console.error('Error while loading page! ' + error.message)}
        onRenderError={(error) => console.error('Error while loading page! ' + error.message)}
        onGetTextError={(error) => console.error('Error while loading text layer items! ' + error.message)}

      />
    </div>
  );
};


export {
  PageRenderer,
};

export type {
  PageRendererProps,
  PageRendererDataType,
};
