import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRightFromCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  imageSrc: string;
  link: string;
}

function ExploreCards({ title, imageSrc, link }: CardProps) {
  return (
    <Card className="relative overflow-hidden rounded-xl w-full max-w-[500px] md:max-w-[643px] lg:max-w-3xl aspect-square">
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
      <CardContent className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-10">
        <div className="flex justify-between items-start">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
            {title}
          </h2>

          <ArrowUpRightFromCircle className="text-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
        </div>
        <Button
          variant="outline"
          className="self-start bg-white text-black hover:bg-gray-200 text-sm md:text-base lg:text-lg py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8"
        >
          <Link to={link}>Explore</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ExploreCards;
