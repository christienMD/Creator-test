import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';
// import { PauseIcon, PlayIcon, VolumeX, Volume2, Download } from 'lucide-react';
// import { useApi } from '@/hooks/useApi';
// import { toast } from 'react-toastify';// Audio Component
interface AudioProps {
  previewUrl?: string;
  bannerImage?: string;
}
export const PurchaseAudioProduct = ({
  previewUrl,
  bannerImage,
}: AudioProps) => {
  return (
    <div className="relative h-full w-full">
      {bannerImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <AudioPlayer
          src={previewUrl}
          onPlay={(e) => console.log('onPlay: ', e)}
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

// import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// interface Props {
//   previewUrl?: string;
//   bannerImage?: string;
// }

// const PurchaseAudioProduct = ({ previewUrl, bannerImage }: Props) => {
//   return (
//     <div className="relative h-full w-full">
//       {/* Background cover image */}
//       {bannerImage && (
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url(${bannerImage})` }}
//         />
//       )}

//       {/* Semi-transparent overlay */}
//       <div className="absolute inset-0 bg-black/40" />

//       {/* Audio player container - centered vertically and horizontally */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <AudioPlayer
//           src={previewUrl}
//           onPlay={(e) => console.log('onPlay: ', e)}
//           className="audio-player-custom"
//           showJumpControls={false}
//           showSkipControls={false}
//           layout="stacked"
//           customControlsSection={[
//             RHAP_UI.MAIN_CONTROLS,
//             RHAP_UI.VOLUME_CONTROLS,
//           ]}
//           autoPlayAfterSrcChange={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default PurchaseAudioProduct;
