/**
 * Shim for next/image - replaces with standard img tag for Remotion
 */
import React from "react";
import { Img, staticFile } from "remotion";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

function Image({
  src,
  alt,
  width,
  height,
  className,
  style,
  fill,
  ...rest
}: ImageProps) {
  // Convert relative paths to staticFile for Remotion
  const imageSrc = src.startsWith("/") ? staticFile(src.slice(1)) : src;

  const imgStyle: React.CSSProperties = {
    ...style,
    ...(fill && {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }),
  };

  return (
    <Img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={imgStyle}
    />
  );
}

export default Image;
