'use client';
import React, { Fragment, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from '../components/utils/copy';
import { escapeHtml } from '../lib/escapeHtml';

type MarkdownRendererProps = {
  children: string;
};

export function MarkdownRenderer({
  children: markdown,
}: MarkdownRendererProps) {
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const code = String(children).replace(/\n$/, '');
          const filename = 'app/ui/markdown.tsx';

          return !inline && match ? (
            <Fragment>
              {filename && (
                <div className="-mb-6 px-3 pb-4 pt-1 table max-w-full rounded-lg bg-slate-700 text-white text-sm">
                  <span>{escapeHtml(filename)}</span>
                </div>
              )}

              <div
                className="relative"
                onMouseEnter={() => setShowCopyToClipboard(true)}
                onMouseLeave={() => setShowCopyToClipboard(false)}
              >
                <SyntaxHighlighter
                  style={oneDark}
                  PreTag="div"
                  language={match[1]}
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
                {showCopyToClipboard && <CopyButton copyContent={code} />}
              </div>
            </Fragment>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
