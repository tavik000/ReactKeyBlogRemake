'use client';
import { useState, useEffect, useContext } from 'react';
import onMediaPasted from '../utils/onMediaPasted';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor, { ICommand, commands, EditorContext, help } from "@uiw/react-md-editor";

const CommentMdEditor = ({
  content,
  onMarkdownChange,
}: {
  content: string;
  onMarkdownChange?: (value: string | undefined) => void;
}) => {
  const [markdown, setMarkdown] = useState<string | undefined>(content);

  useEffect(() => {
    onMarkdownChange?.(markdown);
  }, [markdown, onMarkdownChange]);

  return (
    <div className="container" data-color-mode="light">
      <MDEditor
        value={markdown}
        onChange={(value) => {
          setMarkdown(value);
        }}
        onPaste={async (event) => {
          await onMediaPasted(event.clipboardData, setMarkdown);
        }}
        onDrop={async (event) => {
          await onMediaPasted(event.dataTransfer, setMarkdown);
        }}
        height="100%"
        minHeight={250}
        visibleDragbar={false}
        highlightEnable={false}
        preview="edit"
        commands={[help]}
        extraCommands={[commands.codeEdit, commands.codeLive]}
      />
    </div>
  );
};

export default CommentMdEditor;


