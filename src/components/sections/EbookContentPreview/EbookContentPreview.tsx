interface Props {
  bannerImage: string;
  description: string;
  altText: string;
}

const EbookContentPreview = ({ bannerImage, description , altText }: Props) => {
  return (
    <div className="h-full w-full relative">
      <img
        src={bannerImage}
        alt={`${altText} cover`}
        className="w-full h-full object-cover rounded-md"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2">
        <p className="text-white text-sm font-medium line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default EbookContentPreview;
