import { useState, useEffect } from "react";
import { PasswordResetBackLink } from "../PasswordResetBackLink/PasswordResetBackLink";
import { PasswordResetButton } from "../PasswordResetButton/PasswordResetButton";
import { PasswordResetVerificationInput } from "../PasswordResetVerificationInput/PasswordResetVerificationInput";
import { PasswordResetLayout } from "../PassworsdResetLayout/PassworsdResetLayout";

interface Props {
  phoneNumber: string;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export const PasswordResetStep2 = ({
  phoneNumber,
  onVerify,
  onResend,
}: Props) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async (code: string) => {
    setError("");
    setLoading(true);
    try {
      await onVerify(code);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await onResend();
      setTimeLeft(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code");
    }
  };

  return (
    <PasswordResetLayout currentStep={2}>
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-md bg-gray-100 text-sm mb-6">
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")} :{" "}
            {String(timeLeft % 60).padStart(2, "0")} secs
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Enter your verification code
          </h1>
          <p className="text-gray-500">
            A 6 digit verification code was sent to your Phone number:{" "}
            {phoneNumber}
          </p>
        </div>

        <div className="space-y-6 w-full">
          <PasswordResetVerificationInput onComplete={handleVerify} />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || loading}
            className="w-full text-sm text-teal-700 hover:text-teal-800 disabled:text-gray-400"
          >
            Resend verification code
          </button>

          <PasswordResetButton loading={loading}>Continue</PasswordResetButton>
        </div>

        <PasswordResetBackLink to="/login" label="Go back to the Login page" />
      </div>
    </PasswordResetLayout>
  );
};
