import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const PasswordResetButton = ({
  children,
  className,
  disabled,
  loading,
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "w-full bg-creator-bg-400 hover:bg-creator-bg-400 text-white",
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Please wait...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
