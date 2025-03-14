"use client";

import Image from "next/image";
import imageLoader from "@/lib/imageLoader";

interface MyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
}

const MyImage: React.FC<MyImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  fill = false,
  sizes,
  className,
}) => {
  return (
    <Image
      loader={imageLoader}
      src={src}
      sizes={sizes}
      {...(!fill && {
        width: width,
        height: height,
      })}
      {...(fill && { fill: true })}
      className={className}
      alt={alt}
    />
  );
};

export default MyImage;
