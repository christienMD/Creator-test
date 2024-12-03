import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  label: string;
}

export const PasswordResetBackLink= ({
  to,
  label,
}: Props) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mt-6"
    >
      <ChevronLeft className="w-4 h-4 mr-2" />
      {label}
    </Link>
  );
};
