import { useState } from "react";
import { PasswordResetBackLink } from "../PasswordResetBackLink/PasswordResetBackLink";
import { PasswordResetButton } from "../PasswordResetButton/PasswordResetButton";
import { PasswordResetInput } from "../PasswordResetInput/PasswordResetInput";
import { PasswordResetLayout } from "../PassworsdResetLayout/PassworsdResetLayout";

interface Props {
  onSubmit: (password: string) => Promise<void>;
}

export const PasswordResetStep3 = ({ onSubmit }: Props) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onSubmit(formData.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordResetLayout currentStep={3}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Enter your new password</h1>
          <p className="text-gray-500">
            Enter a strong password that contains letters, numbers and special
            characters
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordResetInput
            label="New password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            showPasswordToggle
          />

          <PasswordResetInput
            label="Re-type password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            showPasswordToggle
            error={error}
          />

          <PasswordResetButton type="submit" loading={loading}>
            Submit
          </PasswordResetButton>
        </form>

        <PasswordResetBackLink to="/login" label="Go back to the Login page" />
      </div>
    </PasswordResetLayout>
  );
};
