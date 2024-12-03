import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  length?: number;
  onComplete?: (code: string) => void;
  error?: string;
  disabled?: boolean;
}

export const PasswordResetVerificationInput = ({
  length = 6,
  onComplete,
  error,
  disabled = false,
}: Props) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (disabled) return;

    const value = element.value;
    if (isNaN(Number(value))) return;

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (element.value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const completeCode = newCode.join("");
    if (
      newCode.every((digit) => digit !== "") &&
      completeCode.length === length
    ) {
      onComplete?.(completeCode);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (disabled) return;

    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!disabled) {
      inputs.current[0]?.focus();
    }
  }, [disabled]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between max-w-xs mx-auto">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "w-12 h-12 text-center text-lg font-semibold",
              error && "border-red-500 focus-visible:ring-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
            inputMode="numeric"
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};
