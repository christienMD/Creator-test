import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface LibraryCardProps {
  icon: React.ReactNode;
  title: string;
}

function LibraryCards({ icon, title }: LibraryCardProps) {
  return (
    <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <div className="text-slate-600">{icon}</div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <Link
            to="/creator/product/new"
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            See more ›
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default LibraryCards;
