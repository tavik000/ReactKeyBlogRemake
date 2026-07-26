import type { Dispatch, SetStateAction } from "react";
import type { ICommand, ExecuteState, TextAreaTextApi } from "@uiw/react-md-editor";
import fileUploader from "./fileUploader";

const imageIcon = (
  <svg width="13" height="13" viewBox="0 0 20 20">
    <path
      fill="currentColor"
      d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
    />
  </svg>
);

const createImageUploadCommand = (
  setMarkdown: Dispatch<SetStateAction<string | undefined>>,
): ICommand => {
  let fileInput: HTMLInputElement | null = null;

  return {
    name: "image-upload",
    keyCommand: "image-upload",
    buttonProps: { "aria-label": "Insert image", title: "Insert image" },
    icon: imageIcon,
    execute: (state: ExecuteState, api: TextAreaTextApi) => {
      if (!fileInput) {
        fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);
      }

      fileInput.value = "";
      fileInput.onchange = async () => {
        const file = fileInput?.files?.[0];
        if (!file) return;

        const placeholder = `![Uploading ${file.name}...]()`;
        const { text, selection } = state;
        const before = text.slice(0, selection.start);
        const after = text.slice(selection.end);
        setMarkdown(before + placeholder + after);

        const result = await fileUploader(file);
        if (!result || result.type !== "image" || !result.imageURL) {
          console.error("Failed to upload image");
          setMarkdown((current) => (current ?? "").replace(placeholder, ""));
          return;
        }

        const markdownImage = `![${result.publicId}](${result.imageURL})`;
        setMarkdown((current) => (current ?? "").replace(placeholder, markdownImage));
      };

      fileInput.click();
    },
  };
};

export default createImageUploadCommand;
