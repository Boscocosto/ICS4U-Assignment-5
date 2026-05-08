import { IMAGE_BASE_URL, IMAGE_PLACEHOLDER, ORIGINAL_IMAGE_BASE_URL } from "@/core";

export const getBackdropUrl = (fileName: string | null | undefined) =>
  fileName ? `${ORIGINAL_IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER;

export const getImageUrl = (fileName: string | null | undefined) => (fileName ? `${IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER);
