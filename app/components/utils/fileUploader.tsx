interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const fileUploader = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'key_blog_content');

  const data = (await fetch(
    'https://api.cloudinary.com/v1_1/diy3s3seb/image/upload',
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => response.json())) as CloudinaryResult;

  const imageURL = data.secure_url;
  const publicId = data.public_id;
  // const imageURL = URL.createObjectURL(file);

  return { publicId, imageURL };
};

export default fileUploader;
