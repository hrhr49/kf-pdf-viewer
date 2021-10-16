type TextFilterKind = 'fuzzyFilter' | 'substringFilter' | 'regexFilter'
type TextFilter = (pattern: string, target: string) => number[] | null;

const substringFilter: TextFilter = (pattern, target) => {
  const index = target.indexOf(pattern);
  if(index >= 0) {
    return Array(pattern.length).fill(0).map((_, i) => i + index);
  } else {
    return null
  }
};

const regexFilter: TextFilter = (pattern, target) => {
  try {
    const result = target.match(pattern);
    if(result) {
      const foundedStr = result[0];
      const index = result.index;
      if (index === undefined) {
        return null;
      }
      return Array(foundedStr.length).fill(0).map((_, i) => i + index);
    } else {
      return null
    }
  } catch(err) {
    // regex syntax error
    return null;
  }
};

const fuzzyFilter: TextFilter = (pattern, target) => {
  const indexes = [];
  let index = 0;
  for (const c of pattern) {
    index = target.indexOf(c, index);
    if (index < 0) return null;
    indexes.push(index);
    index++;
  }
  return indexes;
};

const textFilterMap: Record<TextFilterKind, TextFilter> = {
  substringFilter,
  regexFilter,
  fuzzyFilter,
};

const createTextFilter = (
  textFilterKind: TextFilterKind,
  options?: {
    ignoreCase?: boolean,
  }
): TextFilter => {
  const {
    ignoreCase = false,
  } = options ?? {};

  const textFilter = (pattern: string, target: string) => {
    if (ignoreCase) {
      pattern = pattern.toLowerCase();
      target = target.toLowerCase();
    };
    return textFilterMap[textFilterKind](pattern, target);
  };

  return textFilter;
};

export {
  substringFilter,
  regexFilter,
  fuzzyFilter,
  createTextFilter,
};

export type {
  TextFilterKind,
  TextFilter,
};
