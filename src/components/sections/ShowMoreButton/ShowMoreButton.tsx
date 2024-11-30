interface Props {
  label: string;
  onClick?: () => void;
  route?: string;
  className?: string;
  disabled?: boolean;
}

const ShowMoreButton = ({
  label,
  onClick,
  className = '',
  disabled = false,
}: Props) => {
  return (
    <button
      className={`show-more-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ShowMoreButton;
