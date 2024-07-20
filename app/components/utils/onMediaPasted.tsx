import type { SetStateAction } from 'react';
import fileUpload, { FileUploaderResult } from './fileUploader';
import insertToTextArea from './insertToTextArea';
import { cloudName } from '../../lib/constants';

const onMediaPasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: SetStateAction<string | undefined>) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async (file) => {
      const result = await fileUpload(file);
      if (!result) {
        console.error('Failed to upload file');
        return;
      }

      let insertedMarkdown;
      if (result.type === 'image') {
        insertedMarkdown = insertToTextArea(
          `![${result.publicId}](${result.imageURL})`,
        );
      }
      if (result.type === 'video') {
        const videoSrc = `https://player.cloudinary.com/embed/?public_id=${result.publicId}&cloud_name=${cloudName}`;
        insertedMarkdown = insertToTextArea(
          `<iframe
  src="${videoSrc}"
  width="640"
  height="360" 
  style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
  allowfullscreen
  frameborder="0"
></iframe>`,
        );
      }
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    }),
  );
};

export default onMediaPasted;
