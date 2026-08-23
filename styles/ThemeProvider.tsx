/* Theme Provider */

'use client';

import { createTokenProvider } from 'next-tokens';

export type Theme = 'light' | 'dark';

const { Provider: ThemeProvider, useToken: useTheme } = createTokenProvider({
  storageKey: 'theme',
  attribute: 'class',
  defaultToken: 'system',
  enableSystem: true,
  enableColorScheme: true,
  tokens: ['light', 'dark', 'system'],
  disableTransitionOnChange: false,
});

export { ThemeProvider, useTheme };
