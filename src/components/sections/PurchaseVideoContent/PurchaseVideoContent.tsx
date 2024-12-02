import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { PauseIcon, PlayIcon, VolumeX, Volume2 } from 'lucide-react';
// import { useApi } from '@/utils/fetcher';
// import { toast } from '@/components/ui/use-toast';
interface Props {
  previewUrl?: string;
  thumbnail?: string;
}
export const PurchaseVideoContent = ({ previewUrl }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <div className="relative h-full w-full">
      <div className="player-wrapper h-full">
        <ReactPlayer
          ref={playerRef}
          url={previewUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          muted={isMuted}
          loop={true}
          playsinline={true}
        />
      </div>
      <div className="absolute w-full bottom-2 left-2 flex items-center justify-between ps-6 py-2 pe-8">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className="bg-black bg-opacity-90 rounded-full p-1.5"
          >
            {isPlaying ? (
              <PauseIcon className="h-4 w-4 text-white" />
            ) : (
              <PlayIcon className="h-4 w-4 text-white" />
            )}
          </button>
          <button
            onClick={handleMute}
            className="bg-black bg-opacity-90 rounded-full p-1.5"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white" />
            ) : (
              <Volume2 className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
// import { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';
// import { PauseIcon, PlayIcon, VolumeX, Volume2 } from 'lucide-react';

// interface Props {
//   previewUrl?: string;
//   thumbnail?: string;
// }

// export const PurchaseVideoContent = ({ previewUrl }: Props) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const playerRef = useRef<ReactPlayer>(null);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div className="relative h-full w-full">
//       <div className="player-wrapper h-full">
//         <ReactPlayer
//           ref={playerRef}
//           url={previewUrl}
//           width="100%"
//           height="100%"
//           playing={isPlaying}
//           muted={isMuted}
//           loop={true}
//           playsinline={true}
//           config={{
//             file: {
//               attributes: {
//                 controlsList: 'nodownload',
//               },
//             },
//           }}
//         />
//       </div>
//       <div className="absolute w-full bottom-2 left-2 flex items-center justify-between ps-6 py-2 pe-8">
//         <button
//           onClick={handlePlayPause}
//           className="bg-black bg-opacity-90 rounded-full p-1.5"
//         >
//           {isPlaying ? (
//             <PauseIcon className="h-4 w-4 text-white" />
//           ) : (
//             <PlayIcon className="h-4 w-4 text-white" />
//           )}

//         </button>
//         <button
//           onClick={handleMute}
//           className="bg-black bg-opacity-90 rounded-full p-1.5"
//         >
//           {isMuted ? (
//             <VolumeX className="h-4 w-4 text-white" />
//           ) : (
//             <Volume2 className="h-4 w-4 text-white" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };
