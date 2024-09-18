'use client';
import { useState, useEffect, useContext } from 'react';
import onMediaPasted from '../utils/onMediaPasted';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor, { ICommand, commands, EditorContext, help } from "@uiw/react-md-editor";

const CommentMdEditor = ({
  isNewComment,
  content,
  onMarkdownChange,
  shouldClear: shouldClearToggle,
}: {
  isNewComment: boolean;
  content: string;
  onMarkdownChange?: (value: string | undefined) => void;
  shouldClear?: boolean;
}) => {
  const [markdown, setMarkdown] = useState<string | undefined>(content);

  useEffect(() => {
    onMarkdownChange?.(markdown);
  }, [markdown, onMarkdownChange, content]);

  useEffect(() => {
    if (isNewComment) {
      setMarkdown('');
    }
  }, [shouldClearToggle, isNewComment]);

  return (
    // TODO Localization
    <div className="container" data-color-mode="light">
      <MDEditor
        value={markdown}
        textareaProps={{
          placeholder: 'Please enter the markdown text',
        }}
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


