import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface Props {
  previewUrl: string;
  thumbnail: string;
}

export const CourseContentPreview = ({ previewUrl, thumbnail }: Props) => {
  return (
    <VideoPlayer
      previewUrl={previewUrl}
      thumbnail={thumbnail}
      className="absolute inset-0"
    />
  );
};
