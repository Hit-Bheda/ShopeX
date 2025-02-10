import { v2 as cloudinary } from "cloudinary";
import config from "../../../configs/config";
import fs  from "fs"

export const uploadOnCloudinary = async (filePath: string) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloundinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    return uploadResult?.url;
  } catch (error) {
    console.log(error);
  } finally{
    fs.unlinkSync(filePath)
  }
};
