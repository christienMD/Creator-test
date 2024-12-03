
import { CheckCircle2 } from "lucide-react";
import { PasswordResetButton } from "../PasswordResetButton/PasswordResetButton";
import { PasswordResetLayout } from "../PassworsdResetLayout/PassworsdResetLayout";

export const PasswordResetStep4 = () => {
  return (
    <PasswordResetLayout currentStep={4}>
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-teal-700" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Password reset done</h1>
          <p className="text-gray-500">
            Enter a strong password that contains letters, numbers and special
            characters
          </p>
        </div>

        <PasswordResetButton onClick={() => (window.location.href = "/login")}>
          Login to account
        </PasswordResetButton>
      </div>
    </PasswordResetLayout>
  );
};
