import { ImageService } from "@/services/ImageService";

export const imageUploader = async (image: File) => {
  const uuid = crypto.randomUUID();

  try {
    const uploadedImage = await ImageService.uploadThumbnail(image, uuid);

    console.log(uploadedImage);

    return uploadedImage.url;
  } catch (err) {
    console.error(err);

    return "https://th.bing.com/th/id/OIP.BiRh6eRbAz6Wyns0knwfagHaHa?rs=1&pid=ImgDetMain";
  }
};
