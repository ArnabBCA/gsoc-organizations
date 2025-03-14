interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/*const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const cloudflareAccountHash = "your-account-hash"; // Replace with your actual Cloudflare account hash
  return `https://imagedelivery.net/${cloudflareAccountHash}/${src}/w=${width},q=${
    quality || 75
  }`;
};*/

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  return `${src}?w=${width}${quality ? `&q=${quality}` : ""}`;
};

export default imageLoader;
