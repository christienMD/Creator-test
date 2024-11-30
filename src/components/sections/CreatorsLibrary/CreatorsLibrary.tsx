import LibraryCards from '@/components/cards/LibraryCards/LibraryCards';
import {
  Video,
  Music,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';

function CreatorsLibrary() {
  const productTypes = [
    { title: 'Videos', icon: <Video size={100} /> },
    { title: 'Audio', icon: <Music size={100} /> },
    { title: 'Images', icon: <ImageIcon size={100} /> },
    { title: 'PDFs', icon: <FileText size={100} /> },
    { title: 'Links', icon: <LinkIcon size={100} /> },
  ];

  return (
    <div className="p-6 bg-slate-50/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productTypes.map((product) => (
          <LibraryCards
            key={product.title}
            icon={product.icon}
            title={product.title}
          />
        ))}
      </div>
    </div>
  );
}

export default CreatorsLibrary;
