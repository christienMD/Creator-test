import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface Props {
  previewUrl: string;
  thumbnail: string;
}

export const VideoContentPreview = ({ previewUrl, thumbnail }: Props) => {
  return (
    <VideoPlayer
      previewUrl={previewUrl}
      thumbnail={thumbnail}
      className="absolute inset-0"
    />
  );
};

// refactor: update vidoe preview , added full screen mode and improve visual design.

// fix: fix description html display
