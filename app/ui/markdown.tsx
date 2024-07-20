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

const customStyle = {
  fontSize: '1rem',
  padding: '20px',
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
          const filename = match?.input.split(':')[1];
          const linesToHighlightInput = match?.input.split(':')[2];
          const linesToHighlight = linesToHighlightInput
            ? linesToHighlightInput.split(',').reduce((acc, line) => {
                if (line.includes('-')) {
                  const [start, end] = line.split('-').map(Number);
                  for (let i = start; i <= end; i++) {
                    acc.push(i);
                  }
                } else {
                  acc.push(Number(line));
                }
                return acc;
              }, [] as number[])
            : [];

          return !inline && match ? (
            <Fragment>
              {filename && (
                <div className="-mb-6 table max-w-full rounded-lg bg-slate-700 px-3 pb-4 pt-1 text-sm text-white">
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
                  customStyle={customStyle}
                  showLineNumbers
                  PreTag="div"
                  language={match[1]}
                  wrapLines
                  lineProps={(lineNumber) => {
                    const style: any = {
                      display: 'block',
                      width: 'fit-content',
                    };
                    if (linesToHighlight.includes(lineNumber)) {
                      style.backgroundColor = '#334155';
                      style.borderColor = '#38bdf8';
                    }
                    return { style };
                  }}
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
