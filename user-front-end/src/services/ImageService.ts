import axios from "axios";
import { Image } from "../types/Image";

export class ImageService {
  static async uploadThumbnail(
    thumbFile: File,
    uuid: string
  ): Promise<Image | undefined> {
    const formData = new FormData();
    formData.append("image", thumbFile);

    const response = await axios.post(
      `${import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}?key=${
        import.meta.env.VITE_APP_IMAGE_API_KEY
      }&name=${uuid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 200 -> OK
    if (response.status === 200) {
      const { data } = response.data;
      const { image } = data;
      const img: Image = {
        url: image.url,
        mimetype: image.mime,
      };

      return img;
    }

    console.log(response.data);
    return undefined;
  }
}
