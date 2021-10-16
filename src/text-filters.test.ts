import {substringFilter, regexFilter, fuzzyFilter} from './text-filters'

const testCase = [
  {
    pattern: '',
    target: '',
    substringFilterResult: [],
    fuzzyFilterResult: [],
    regexFilterResult: [],
  },
  {
    pattern: 'a',
    target: 'a',
    substringFilterResult: [0],
    fuzzyFilterResult: [0],
    regexFilterResult: [0],
  },
  {
    pattern: 'a',
    target: 'A',
    substringFilterResult: null,
    fuzzyFilterResult: null,
    regexFilterResult: null,
  },
  {
    pattern: 'ab',
    target: 'ab',
    substringFilterResult: [0, 1],
    fuzzyFilterResult: [0, 1],
    regexFilterResult: [0, 1],
  },
  {
    pattern: 'ab',
    target: 'ba',
    substringFilterResult: null,
    fuzzyFilterResult: null,
    regexFilterResult: null,
  },
  {
    pattern: 'a',
    target: '',
    substringFilterResult: null,
    fuzzyFilterResult: null,
    regexFilterResult: null,
  },
  {
    pattern: 'aa',
    target: 'abab',
    substringFilterResult: null,
    fuzzyFilterResult: [0, 2],
    regexFilterResult: null,
  },
  {
    pattern: 'b',
    target: 'ab',
    substringFilterResult: [1],
    fuzzyFilterResult: [1],
    regexFilterResult: [1],
  },
];

const testSubstringFilter = () => {
  testCase.forEach(({pattern, target, substringFilterResult}, i) => {
    test(`substringFilter${i} (${pattern}, ${target}, ${substringFilterResult})`, () => {
        expect(substringFilter(pattern, target)).toEqual(substringFilterResult);
    });
  });
}

const testRegexFilter = () => {
  const regexTestCase = [
    {
      pattern: 'b+',
      target: 'aabbcc',
      regexFilterResult: [2, 3],
    },
    {
      pattern: '((((b+))))',
      target: 'aabbcc',
      regexFilterResult: [2, 3],
    },
    {
      pattern: '*', // invalid regex
      target: '',
      regexFilterResult: null,
    },
  ];    
  [...testCase, ...regexTestCase].forEach(({pattern, target, regexFilterResult}, i) => {
    test(`regexFilter${i} (${pattern}, ${target}, ${regexFilterResult})`, () => {
        expect(regexFilter(pattern, target)).toEqual(regexFilterResult);
    });
  });
}

const testFuzzyFilter = () => {
  testCase.forEach(({pattern, target, fuzzyFilterResult}, i) => {
    test(`fuzzyFilter${i} (${pattern}, ${target}, ${fuzzyFilterResult})`, () => {
        expect(fuzzyFilter(pattern, target)).toEqual(fuzzyFilterResult);
    });
  });
}

testSubstringFilter();
testRegexFilter();
testFuzzyFilter();
