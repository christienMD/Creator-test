interface Props {
  percentageDiscount: number;
  month: string;
  className?: string;
}

const AnnouncementAlert = ({ percentageDiscount, month, className }: Props) => {
  return (
    <div
      className={` fixed z-30 top-0 right-0 text-sm bg-creator-bg-300 text-white text-center w-full h-6 sm:text-base ${className}`}
    >
      Get {percentageDiscount}% of on all sales for the month of{' '}
      <span className="capitalize">{month}</span>
    </div>
  );
};

export default AnnouncementAlert;
