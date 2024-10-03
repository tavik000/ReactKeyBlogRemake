"use client";
import { useState, useEffect, useContext } from "react";
import onMediaPasted from "../utils/onMediaPasted";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor, { ICommand, commands, EditorContext, help } from "@uiw/react-md-editor";
import { useLocaleContext } from "../context/locale-provider";
import { useTheme } from "../context/theme-provider";

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
  const { dict } = useLocaleContext();
  const [markdown, setMarkdown] = useState<string | undefined>(content);
  const { theme } = useTheme();

  useEffect(() => {
    onMarkdownChange?.(markdown);
  }, [markdown, onMarkdownChange, content]);

  useEffect(() => {
    if (isNewComment) {
      setMarkdown("");
    }
  }, [shouldClearToggle, isNewComment]);

  return (
    <div className="container" data-color-mode={theme}>
      <MDEditor
        value={markdown}
        textareaProps={{
          placeholder: dict.comment.commentPlaceholder,
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
