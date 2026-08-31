/* Code Block component */

import CopyButton from './CopyButton';
import getHighlighter from '@/utils/highlighter';

interface CodeBlockProps {
  code: string;
  language: string;
  label?: string;
}

const LABELS = {
  c: 'C',
  cpp: 'C++',
  python: 'Python',
  bash: 'Bash',
  json: 'JSON',
} as const;

export default async function CodeBlock({ code, language, label = '' }: CodeBlockProps) {
  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: 'css-variables',
  });

  return (
    <div className="bg-surface-container-low text-on-surface text-sm font-mono px-4 py-2 overflow-hidden rounded-xl border border-outline-variant">
      <div className="flex items-center justify-between font-medium mb-2">
        <span>{label || LABELS[language as keyof typeof LABELS] || language}</span>
        <CopyButton code={code} />
      </div>
      <pre className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
