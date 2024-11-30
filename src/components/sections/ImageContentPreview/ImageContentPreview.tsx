interface Props {
  bannerImage?: string;
  altText: string;
}

const ImageContentPreview = ({ bannerImage, altText }: Props) => {
  return (
    <img
      src={bannerImage}
      alt={altText}
      className="w-full h-full object-cover rounded-md"
    />
  );
};

export default ImageContentPreview;
