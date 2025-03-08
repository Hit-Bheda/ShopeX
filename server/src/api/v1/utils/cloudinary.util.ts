import { v2 as cloudinary } from "cloudinary";
import config from "../../../configs/config";
import streamifier from "streamifier";

export const uploadOnCloudinary = async (filerBuffer: Buffer) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloundinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) reject(error);
          resolve(result?.url);
        },
      );
      streamifier.createReadStream(filerBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.log(error);
    throw new Error("Cloudinary Upload Failed!");
  }
};
