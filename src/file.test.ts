import mime from 'mime-types';

import {
  SUPPORTED_EXTENSIONS_WITH_COMMA,
  SUPPORTED_EXTENSIONS_WITHOUT_COMMA,
} from 'src-common/file'


test('supoprted extensions test', () => {
  SUPPORTED_EXTENSIONS_WITHOUT_COMMA.forEach((extension: string) => {
    expect(extension.includes('.')).toBe(false);
  });

  SUPPORTED_EXTENSIONS_WITH_COMMA.forEach((extension: string) => {
    expect(extension.includes('.')).toBe(true);
  });

  SUPPORTED_EXTENSIONS_WITH_COMMA.forEach((extension: string) => {
    // all extension should have MIME type
    expect(typeof mime.lookup(extension)).toBe('string');
  });
});


