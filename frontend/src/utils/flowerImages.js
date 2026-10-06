const LEGACY_IMAGE_PATHS = {
  "/images/inside2.jpg": "/images/inside2.png",
  "/images/inside9.jpg": "/images/inside9.png",
};

export function normalizeFlowerImage(image) {
  return LEGACY_IMAGE_PATHS[image] || image;
}
