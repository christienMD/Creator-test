import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}

export const PasswordResetInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      helperText,
      showPasswordToggle,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          <Input
            {...props}
            ref={ref}
            type={
              showPasswordToggle ? (showPassword ? "text" : "password") : type
            }
            className={cn(
              "w-full",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);
