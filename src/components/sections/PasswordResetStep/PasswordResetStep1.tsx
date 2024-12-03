import { useState } from "react";
import { PasswordResetButton } from "../PasswordResetButton/PasswordResetButton";
import { PasswordResetInput } from "../PasswordResetInput/PasswordResetInput";
import { PasswordResetLayout } from "../PassworsdResetLayout/PassworsdResetLayout";

interface Props {
  onSubmit: (phoneNumber: string) => Promise<void>;
}

export const PasswordResetStep1 = ({ onSubmit }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(phoneNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordResetLayout currentStep={1}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="text-gray-500">
            No worries, we will send a verification to your email +237 xxxxxxxxx
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordResetInput
            label="Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+237 xxxxxxxxx"
            error={error}
          />

          <PasswordResetButton type="submit" loading={loading}>
            Reset password
          </PasswordResetButton>
        </form>
      </div>
    </PasswordResetLayout>
  );
};
