/* Copy button for code blocks */

'use client';

import { useState } from 'react';

import { Copy, Check, Cross } from 'lucide-react';

import Button from '@/components/Button';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failedToCopy, setFailedToCopy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
      setFailedToCopy(true);
    }
  };

  return (
    <Button onClick={handleCopy} variant="circular">
      {failedToCopy ? <Cross size={20} /> : copied ? <Check size={20} /> : <Copy size={20} />}
    </Button>
  );
}
