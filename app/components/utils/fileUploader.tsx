import { cloudName } from '../../lib/constants';

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}


export interface FileUploaderResult {
  type: string;
  publicId: string;
  imageURL?: string;
  videoUrl?: string;
}

const fileUploader = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  // detect file type, check it is image or video
  const type = file.type.split('/')[0];

  console.log('uploading ', type);
  formData.append('upload_preset', `key_blog_${type}`);

  const data = (await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => response.json())) as CloudinaryResult;

  if (type === 'image') {
    const imageURL = data.secure_url;
    const publicId = data.public_id;

    // this is localhost url for testing
    // const imageURL = URL.createObjectURL(file);

    return { type, publicId, imageURL } as FileUploaderResult;

  } else if (type === 'video') {
    const videoUrl = data.secure_url;
    const publicId = data.public_id;


    return { type, publicId, videoUrl } as FileUploaderResult;
  }
};

export default fileUploader;
