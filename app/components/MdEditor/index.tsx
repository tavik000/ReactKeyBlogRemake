import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from 'react';
import onMediaPasted from '../utils/onMediaPasted';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useTheme } from '../context/theme-provider';

const MdEditor = ({
  content,
  onMarkdownChange,
}: {
  content: string;
  onMarkdownChange?: (value: string | undefined) => void;
}) => {
  const [markdown, setMarkdown] = useState<string | undefined>(content);
  const { theme } = useTheme();

  useEffect(() => {
    onMarkdownChange?.(markdown);
  }, [markdown, onMarkdownChange]);

  return (
    <div className="container" data-color-mode={theme}>
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
        minHeight={1000}
        visibleDragbar={false}
        highlightEnable={false}
      />
    </div>
  );
};

export default MdEditor;

