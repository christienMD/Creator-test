import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginData } from "@/schemas/LoginSchema";
import { cn } from "@/lib/utils";
import { AuthUser, LoginEntity } from "@/types/entities";
// import { toast } from "react-toastify";
import { useApi } from "@/utils/fetcher";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const navigate = useNavigate();
  const { API } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // Helper function to check if input is email
  const isEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Helper function to check if input is valid 9-digit phone number
  const isPhoneNumber = (value: string): boolean => {
    return /^\d{9}$/.test(value);
  };

  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      // Determine if identifier is email or phone number
      const identifier = data.identifier.trim();
      // Initialize loginData first with the identifier
      const loginData: LoginEntity = {};

      if (isEmail(identifier)) {
        loginData.email = identifier;
      } else if (isPhoneNumber(identifier)) {
        loginData.phone_number = `+237${identifier}`;
      } else {
        throw new Error("Invalid email or phone number format");
      }

      // Add password after the identifier
      loginData.password = data.password;

      console.log("type: ", typeof data.password);

      const response = await API.login(loginData);

      if (!response[2]) {
        throw response[1];
      }

      const loginResponse = response[1] as AuthUser;

      // Store auth data
      localStorage.setItem("auth_token", loginResponse.token);
      localStorage.setItem("userData", JSON.stringify(loginResponse));

      // Navigate with welcome message state
      const redirectPath =
        loginResponse.role === "creator" ? "/creator/product/new" : "/home";
      navigate(redirectPath, {
        state: {
          showWelcome: true,
          userName: loginResponse.name,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || "Invalid credentials";
      setApiError({
        message: errorMessage,
        errors: error?.errors,
      });
      // toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoFocus>
        {apiError && (
          <ErrorAlert
            title="Login Failed"
            message={apiError.message}
            className="mb-4 animate-in fade-in-50 duration-300"
          />
        )}

        <div>
          <label
            className="block font-medium text-creator-text-200"
            htmlFor="identifier"
          >
            Email or Phone Number
          </label>
          <Input
            {...register("identifier")}
            id="identifier"
            type="text"
            placeholder="Enter email or 9-digit phone number"
            className={cn(
              "py-5",
              errors.identifier && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.identifier && (
            <p className="mt-1 text-sm text-red-500">
              {errors.identifier.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            For phone number, enter 9 digits without +237 e.g 674430334
          </p>
        </div>

        <div>
          <label
            className="block font-medium text-creator-text-200"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={cn(
                "py-5",
                errors.password && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            to="/password-reset"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full bg-creator-bg-400 hover:bg-creator-bg-400 p-5 font-semibold",
            isLoading && "cursor-text opacity-70"
          )}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <p className="text-center font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="text-creator-text-100">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
