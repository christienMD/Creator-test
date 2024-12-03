
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordResetSchema,
  VerificationSchema,
  NewPasswordSchema,
  type PasswordResetData,
  type VerificationData,
  type NewPasswordData,
} from "@/schemas/PasswordResetSchema";
import { CheckCircle2 } from "lucide-react";
import { useApi } from "@/utils/fetcher";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { PasswordResetBackLink } from "../PasswordResetBackLink/PasswordResetBackLink";
import { PasswordResetButton } from "../PasswordResetButton/PasswordResetButton";
import { PasswordResetInput } from "../PasswordResetInput/PasswordResetInput";
import { PasswordResetLayout } from "../PassworsdResetLayout/PassworsdResetLayout";
import { PasswordResetVerificationInput } from "../PasswordResetVerificationInput/PasswordResetVerificationInput";

type Step = 1 | 2 | 3 | 4;

interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export const PasswordReset = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [identifier, setIdentifier] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const { API } = useApi();

  const isEmailCheck = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isPhoneNumber = (value: string): boolean => {
    return /^\d{9}$/.test(value);
  };

  const {
    register: registerIdentifier,
    handleSubmit: handleIdentifierSubmit,
    formState: { errors: identifierErrors },
  } = useForm<PasswordResetData>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const {
    formState: { errors: verificationErrors },
  } = useForm<VerificationData>({
    resolver: zodResolver(VerificationSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<NewPasswordData>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const handleRequestReset = async (data: PasswordResetData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const emailIdentifier = isEmailCheck(data.identifier);
      const formattedIdentifier = isPhoneNumber(data.identifier)
        ? `+237${data.identifier}`
        : data.identifier;

      setIdentifier(formattedIdentifier);
      setIsEmail(emailIdentifier);

      const response = await API.requestResetToken({
        [emailIdentifier ? "email" : "phone_number"]: formattedIdentifier,
      });

      if (!response[2]) {
        throw response[1];
      }

      setCurrentStep(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Reset request error:", error);
      setApiError({
        message: error?.message || "Failed to send reset code",
        errors: error?.errors,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    setVerificationCode(code);
    setCurrentStep(3);
  };

  const handleResetPassword = async (data: NewPasswordData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const response = await API.resetPassword({
        token: verificationCode,
        password: data.password,
        password_confirmation: data.password,
        [isEmail ? "email" : "phone_number"]: identifier,
      });

      if (!response[2]) {
        throw response[1];
      }

      setCurrentStep(4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Password reset error:", error);
      setApiError({
        message: error?.message || "Failed to reset password",
        errors: error?.errors,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form
            onSubmit={handleIdentifierSubmit(handleRequestReset)}
            className="space-y-6"
          >
            {apiError && (
              <ErrorAlert
                title="Reset Request Failed"
                message={apiError.message}
                className="mb-4 animate-in fade-in-50 duration-300"
              />
            )}

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Forgot password</h1>
              <p className="text-gray-500">
                No worries, we will send a verification code to reset your
                password
              </p>
            </div>

            <PasswordResetInput
              {...registerIdentifier("identifier")}
              label="Email or Phone Number"
              placeholder="Enter email or 9-digit phone number"
              error={identifierErrors.identifier?.message}
              helperText="For phone number, enter 9 digits without +237 e.g 674430334"
            />

            <PasswordResetButton type="submit" loading={isLoading}>
              Reset password
            </PasswordResetButton>
          </form>
        );

      case 2:
        return (
          <div className="space-y-6">
            {apiError && (
              <ErrorAlert
                title="Verification Failed"
                message={apiError.message}
                className="mb-4 animate-in fade-in-50 duration-300"
              />
            )}

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">
                Enter verification code
              </h1>
              <p className="text-gray-500">
                A verification code was sent to {identifier}
              </p>
            </div>

            <PasswordResetVerificationInput
              onComplete={handleVerifyCode}
              error={verificationErrors?.code?.message}
            />

            <PasswordResetBackLink to="/login" label="Go back to Login page" />
          </div>
        );

      case 3:
        return (
          <form
            onSubmit={handlePasswordSubmit(handleResetPassword)}
            className="space-y-6"
          >
            {apiError && (
              <ErrorAlert
                title="Password Reset Failed"
                message={apiError.message}
                className="mb-4 animate-in fade-in-50 duration-300"
              />
            )}

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Enter new password</h1>
              <p className="text-gray-500">
                Enter a strong password that contains letters, numbers and
                special characters
              </p>
            </div>

            <PasswordResetInput
              {...registerPassword("password")}
              type="password"
              label="New password"
              showPasswordToggle
              error={passwordErrors.password?.message}
            />

            <PasswordResetInput
              {...registerPassword("confirmPassword")}
              type="password"
              label="Confirm password"
              showPasswordToggle
              error={passwordErrors.confirmPassword?.message}
            />

            <PasswordResetButton type="submit" loading={isLoading}>
              Submit
            </PasswordResetButton>

            <PasswordResetBackLink to="/login" label="Go back to Login page" />
          </form>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle2 className="h-16 w-16 mx-auto text-teal-700" />
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Password reset done</h1>
              <p className="text-gray-500">
                Your password has been successfully reset
              </p>
            </div>

            <PasswordResetButton onClick={() => navigate("/login")}>
              Login to account
            </PasswordResetButton>
          </div>
        );
    }
  };

  return (
    <PasswordResetLayout currentStep={currentStep}>
      {renderStepContent()}
    </PasswordResetLayout>
  );
};
