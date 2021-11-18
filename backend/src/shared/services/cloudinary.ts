import cloudinary from "cloudinary";
import { CLOUDINARY_CONFIG } from "../config";
export { v2 as cloudinary } from "cloudinary";

cloudinary.v2.config({
  ...CLOUDINARY_CONFIG,
  secure: true,
});
