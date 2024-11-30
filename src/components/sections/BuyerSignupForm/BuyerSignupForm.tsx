import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomerRegisterSchema,
  type CustomerRegisterData,
} from "@/schemas/CustomerRegisterSchema";
import { cn } from "@/lib/utils";
import addImage from "/images/add-image.png";
import { useApi } from "@/utils/fetcher";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput";

interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

const BuyerSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { API } = useApi();
  const navigate = useNavigate();

  const methods = useForm<CustomerRegisterData>({
    resolver: zodResolver(CustomerRegisterSchema),
    defaultValues: {
      role: "customer",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: CustomerRegisterData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Append all form fields
      formData.append("name", data.name);
      formData.append("email", data.email ?? "");
      formData.append("phone_number", data.phone_number);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      formData.append("role", data.role);

      // Only append profile_pic if it exists
      if (data.profile_pic instanceof File) {
        formData.append("profile_pic", data.profile_pic);
      }

      const response = await API.registerCustomer(formData);
      console.log("Registration successful:", response);

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess: true,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error?.errors?.email?.[0] ||
        error?.message ||
        "An unexpected error occurred";

      setApiError({
        message: errorMessage,
        errors: error?.errors,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("profile_pic", file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-2">
          <div
            onClick={handleImageClick}
            className="cursor-pointer w-24 h-24 relative"
          >
            <img
              src={previewUrl || addImage}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.profile_pic && (
            <p className="text-sm text-red-500">{errors.profile_pic.message}</p>
          )}
        </div>

        <div>
          <label
            className="block font-medium text-creator-text-200"
            htmlFor="name"
          >
            Name
          </label>
          <Input
            {...register("name")}
            id="name"
            placeholder="Name"
            className={cn(
              "py-5",
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <PhoneNumberInput<CustomerRegisterData>
          label="Phone number"
        />
        

        <div>
          <label
            className="block font-medium text-creator-text-200"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email"
            className={cn(
              "py-5",
              errors.email && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
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

        <div>
          <label
            className="block font-medium text-creator-text-200"
            htmlFor="confirm-password"
          >
            Retype Password
          </label>
          <div className="relative">
            <Input
              {...register("password_confirmation")}
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Retype password"
              className={cn(
                "py-5",
                errors.password_confirmation &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
          {errors.password_confirmation && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <div>
          {apiError && (
            <ErrorAlert
              title="Registration Failed"
              message={apiError.message}
              className="mb-4 animate-in fade-in-50 duration-300"
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full bg-creator-bg-400 hover:bg-creator-bg-400 p-5 font-semibold",
            isLoading && "cursor-not-allowed opacity-70"
          )}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              We are creating your account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className="text-center font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-creator-text-100">
            Sign in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default BuyerSignupForm;
