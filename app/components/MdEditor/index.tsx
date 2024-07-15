import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import onImagePasted from  '../utils/onImagePasted';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MdEditor = ({postContent}: {postContent: string}) => {
  const [markdown, setMarkdown] = useState<string | undefined>(postContent);

  return (
    <div className="container" data-color-mode="light">
      <MDEditor
        value={markdown}
        onChange={(value) => {
          setMarkdown(value);
        }}
        onPaste={async (event) => {
            await onImagePasted(event.clipboardData, setMarkdown);
          }}
          onDrop={async (event) => {
            await onImagePasted(event.dataTransfer, setMarkdown);
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
