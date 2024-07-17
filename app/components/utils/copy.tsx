'use client';
import React, { Fragment, useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const CopyButton = ({ copyContent }: { copyContent: string }) => {
  const [showCopiedText, setShowCopiedText] = useState(false);
  const clickCopyHandler = async () => {
    const message = copyContent;
    try {
      await navigator.clipboard.writeText(message);
      setShowCopiedText(true);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <Fragment>
      {showCopiedText && (
        <div className="absolute right-8 top-2 inline-block rounded-md px-1 text-white">
          Copied!
        </div>
      )}
      <button
        className="absolute right-2 top-2 inline-block h-7 w-7 rounded-lg bg-transparent p-0.5 text-gray-400 hover:bg-slate-600"
        onClick={() => clickCopyHandler()}
      >
        <ClipboardDocumentIcon />
      </button>
    </Fragment>
  );
};

export default CopyButton;
