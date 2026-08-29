/* Shiki's async highlighter for code blocks. */

import { createHighlighter } from 'shiki';
import { createCssVariablesTheme } from 'shiki/core';

import type { Highlighter } from 'shiki';

const theme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--code-',
  variableDefaults: {},
  fontStyle: true,
});

let highlighterPromise: Promise<Highlighter> | null = null;

const LANGS = ['c', 'cpp', 'python', 'bash', 'json'] as const;

export default async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}
