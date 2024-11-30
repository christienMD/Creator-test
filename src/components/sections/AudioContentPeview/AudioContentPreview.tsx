import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface Props {
  previewUrl?: string;
  bannerImage?: string;
}

const AudioContentPreview = ({ previewUrl, bannerImage }: Props) => {
  return (
    <div className="relative h-full w-full">
      {/* Background cover image */}
      {bannerImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      )}

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Audio player container - centered vertically and horizontally */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AudioPlayer
          src={previewUrl}
          onPlay={(e) => console.log("onPlay: ", e)}
          className="audio-player-custom"
          showJumpControls={false}
          showSkipControls={false}
          layout="stacked"
          customControlsSection={[
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          autoPlayAfterSrcChange={false}
        />
      </div>
    </div>
  );
};

export default AudioContentPreview;
